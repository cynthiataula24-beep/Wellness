import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import nltk
from flask_cors import CORS  # <--- 1. Import this
from datetime import datetime
# --- Auth & Database Setup (append below your existing code) ---
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from datetime import timedelta
# --- Download VADER lexicon once ---
nltk.download("vader_lexicon")

from nltk.sentiment import SentimentIntensityAnalyzer

# --- Initialize analyzer globally (not inside the route) ---
sia = SentimentIntensityAnalyzer()

# --- Load environment variables ---
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not found. Check your .env file.")

# --- Configure Google Generative AI ---
genai.configure(api_key=API_KEY)

# --- Flask app setup ---
app = Flask(__name__)
# FIX 1: Allow CORS from all origins so your IP address connection works
# --- 1. UPDATED CORS (Ensures headers like Authorization work smoothly) ---
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# --- Constants ---
MODEL = "gemini-2.5-flash"
MODEL = "gemini-2.5-flash"

SYSTEM_PROMPT = """
You are a compassionate, emotionally intelligent mental wellness companion. Your tone is calm, warm, thoughtful, and grounded. You respond like a trusted, insightful friend — not overly clinical, not robotic, and not overly casual.

Core personality:
- You listen deeply and reflect back what the user is feeling in a clear, validating way.
- You are honest, but gentle. You do not sugarcoat, but you also do not judge.
- You help the user understand themselves better, not just feel better in the moment.
- You avoid clichés and shallow advice. Your responses feel personal and specific.
- You speak in natural, flowing language (not bullet-heavy unless necessary).

How you respond:
- Start by acknowledging and understanding the user’s emotions or thoughts.
- Gently explore what might be underneath their feelings (patterns, fears, desires, habits).
- Offer grounded perspective or reframing when helpful.
- Ask thoughtful follow-up questions only when it adds value.
- Keep responses moderately detailed, but not overwhelming.

Important tone rules:
- Do NOT sound like a therapist giving formal advice.
- Do NOT sound overly excited, cheesy, or exaggerated.
- Do NOT dismiss or invalidate feelings.
- Do NOT give generic motivational quotes.
- Do NOT rush to solutions — understanding comes first.

Safety:
- If the user expresses severe distress, encourage seeking real-world support in a calm, non-alarmist way.
- Do not provide harmful instructions or reinforce negative self-beliefs.

Goal:
Help the user feel understood, gain clarity about themselves, and gently grow in self-awareness over time.

Style refinement:
- Occasionally challenge the user gently if their thinking is limiting or self-critical.
- Use soft, reflective phrasing like:
  "It sounds like..."
  "I get the sense that..."
  "Part of you might be feeling..."
- Avoid over-explaining. Let some thoughts breathe.
- Prioritize clarity and emotional depth over quantity.
"""

# --- Create model instance ---
model = genai.GenerativeModel(MODEL)

# --- Chat sessions store (simple in-memory for now) ---
chat_sessions = {}

@app.route("/")
def home():
    """Health check route."""
    return {"message": "Gemini Chat backend is running!"}



# --- Chat route ---
@app.route("/chat", methods=["POST"])
def chat():
    try:
        body = request.get_json() or {}
        messages = body.get("messages", [])
        session_id = body.get("session_id", "default")

        if not messages:
            return jsonify({"error": "Messages required"}), 400

        # Initialize chat session if not exists
        if session_id not in chat_sessions:
            chat_sessions[session_id] = model.start_chat(
                history=[{"role": "user", "parts": [SYSTEM_PROMPT]}]
            )

        chat = chat_sessions[session_id]

        # Get the latest user message
        user_message = messages[-1]["text"]

        # Send to Gemini
        response = chat.send_message(user_message)
        reply = response.text or "I'm here for you, but I couldn't get a full response."

        return jsonify({"reply": reply})

    except Exception as e:
        error_str = str(e).lower()

        if "quota" in error_str or "rate limit" in error_str:
            return jsonify({
                "reply": "You've reached today's free request limit. Please try again tomorrow or upgrade your quota."
            }), 429

        if "connection" in error_str or "timeout" in error_str:
            return jsonify({
                "reply": "There was a network issue talking to Gemini. Please try again in a moment."
            }), 503

        return jsonify({"reply": "Internal Server Error. Try again later."}), 500




# Database config (SQLite by default; switch to Postgres/MySQL later)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///haven.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT config
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "change-this-in-production")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- User model ---
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    display_name = db.Column(db.String(255), nullable=True)
    # 1. Add this column
    profile_pic = db.Column(db.Text, nullable=True)

    def set_password(self, password: str):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "display_name": self.display_name,
            "profile_pic": self.profile_pic ,# 2. Include it here
        }

# --- Corrected Auth Routes ---

@app.route("/auth/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    email, password, display_name = (data.get("email") or "").strip().lower(), data.get("password") or "", data.get("display_name") or ""
    if not email or not password: 
        return jsonify({"msg": "Required fields missing"}), 400
    if User.query.filter_by(email=email).first(): 
        return jsonify({"msg": "User already exists"}), 400
    user = User(email=email, display_name=display_name)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": token, "user": user.to_dict()}), 201

@app.route("/auth/login", methods=["POST"])
def login_user():
    data = request.get_json() or {}
    email, password = (data.get("email") or "").strip().lower(), data.get("password") or ""
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password): 
        return jsonify({"msg": "Invalid credentials"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": token, "user": user.to_dict()}), 200

@app.route("/auth/me", methods=["GET"])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user: 
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"user": user.to_dict()}), 200

@app.route("/auth/update", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user: return jsonify({"msg": "User not found"}), 404
    data = request.get_json()
    if "profile_pic" in data:
        user.profile_pic = data["profile_pic"]
    if "display_name" in data:
        user.display_name = data["display_name"]
    db.session.commit()
    return jsonify({"msg": "Profile updated", "user": user.to_dict()}), 200


# --- Journal Model ---
class JournalEntry(db.Model):
    __tablename__ = "journal_entries"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    text = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "date": self.date
        }

# --- Journal Routes ---

@app.route("/get_journal", methods=["GET"])
@jwt_required()
def get_journal():
    user_id = get_jwt_identity()
    # Fetch all entries for the logged-in user, newest first
    entries = JournalEntry.query.filter_by(user_id=int(user_id)).order_by(JournalEntry.id.desc()).all()
    return jsonify([e.to_dict() for e in entries]), 200

@app.route("/save_journal", methods=["POST"])
@jwt_required()
def save_journal():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    text = data.get("text")
    date = data.get("date")

    if not text or not date:
        return jsonify({"msg": "Missing text or date"}), 400

    new_entry = JournalEntry(user_id=int(user_id), text=text, date=date)
    db.session.add(new_entry)
    db.session.commit()
    
    # FIX 2: Return the entry to the frontend so it shows up in the list immediately
    return jsonify(new_entry.to_dict()), 201
    
# --- Delete a single entry ---
@app.route("/delete_journal/<int:entry_id>", methods=["DELETE"])
@jwt_required()
def delete_journal(entry_id):
    user_id = get_jwt_identity()
    entry = JournalEntry.query.filter_by(id=entry_id, user_id=int(user_id)).first()
    
    if not entry:
        return jsonify({"msg": "Entry not found"}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({"msg": "Entry deleted successfully"}), 200

# --- Clear all entries for the user ---
@app.route("/clear_journal", methods=["DELETE"])
@jwt_required()
def clear_journal():
    user_id = get_jwt_identity()
    JournalEntry.query.filter_by(user_id=int(user_id)).delete()
    db.session.commit()
    return jsonify({"msg": "All entries cleared"}), 200





class AssistantSettings(db.Model):
    __tablename__ = "assistant_settings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(100), default="Haven")
    pic = db.Column(db.Text, nullable=True)  # store base64 string or URL

    def to_dict(self):
        return {
            "assistantName": self.name,
            "assistantPic": self.pic
        }

class ChatMessage(db.Model):
    __tablename__ = "chat_messages"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    sender = db.Column(db.String(10), nullable=False)  # "user" or "ai"
    timestamp = db.Column(db.BigInteger, nullable=False)
    date_group = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "text": self.text,
            "sender": self.sender,
            "timestamp": self.timestamp,
            "dateGroup": self.date_group
        }


@app.route("/assistant_settings", methods=["GET"])
@jwt_required()
def get_settings():
    user_id = get_jwt_identity()
    settings = AssistantSettings.query.filter_by(user_id=user_id).first()
    if not settings:
        return jsonify({"assistantName": "Haven", "assistantPic": None})
    return jsonify(settings.to_dict())

@app.route("/assistant_settings", methods=["POST"])
@jwt_required()
def update_settings():
    user_id = get_jwt_identity()
    data = request.get_json()
    settings = AssistantSettings.query.filter_by(user_id=user_id).first()
    if not settings:
        settings = AssistantSettings(
            user_id=user_id,
            name=data.get("assistantName", "Haven"),
            pic=data.get("assistantPic")
        )
        db.session.add(settings)
    else:
        settings.name = data.get("assistantName", settings.name)
        settings.pic = data.get("assistantPic", settings.pic)
    db.session.commit()
    return jsonify({"msg": "Settings updated"})


@app.route("/chat_history", methods=["GET"])
@jwt_required()
def get_chat_history():
    user_id = get_jwt_identity()
    chats = ChatMessage.query.filter_by(user_id=user_id).order_by(ChatMessage.timestamp).all()
    return jsonify([c.to_dict() for c in chats])


@app.route("/chat_history", methods=["POST"])
@jwt_required()
def save_chat_message():
    user_id = get_jwt_identity()
    data = request.get_json()
    msg = ChatMessage(
        user_id=user_id,
        text=data["text"],
        sender=data["sender"],
        timestamp=data["timestamp"],
        date_group=data["dateGroup"]
    )
    db.session.add(msg)
    db.session.commit()
    return jsonify({"msg": "Message saved"})

@app.route("/chat_history", methods=["DELETE"])
@jwt_required()
def clear_chat_history():
    user_id = get_jwt_identity()
    ChatMessage.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"msg": "Chat history cleared"})

# --- ADD THIS TO YOUR IMPORTS AT THE TOP ---


# --- MOOD LOG MODEL (Updated Fix) ---
class MoodLog(db.Model):
    __tablename__ = "mood_logs"
    id = db.Column(db.Integer, primary_key=True)
    # Changed 'user.id' to 'users.id' to match your User table name
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    compound = db.Column(db.Float, nullable=False)
    emotion = db.Column(db.String(50))
    recommendation = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "compound": self.compound,
            "emotion": self.emotion,
            "recommendation": self.recommendation,
            "date": self.date.isoformat()
        }

# --- UPDATED MOOD ROUTES ---

@app.route("/analyze", methods=["POST"])
@jwt_required() # Now requires login to save to database
def analyze():
    user_id = get_jwt_identity()
    body = request.get_json() or {}
    text = body.get("text", "").strip()

    if not text:
        return jsonify({"msg": "Please enter some text to analyze."}), 400

    try:
        # 1. Sentiment Analysis logic
        scores = sia.polarity_scores(text)
        compound = scores.get("compound", 0.0)

        if compound >= 0.3:
            emotion, recommendation = "happy", "Keep smiling! Maybe share your joy with a friend."
        elif compound <= -0.3:
            emotion, recommendation = "sad", "Take a deep breath, maybe try journaling or a short walk."
        else:
            emotion, recommendation = "neutral", "Stay mindful and keep tracking your mood."

        # 2. SAVE TO DATABASE
        new_log = MoodLog(
            user_id=int(user_id),
            text=text,
            compound=compound,
            emotion=emotion,
            recommendation=recommendation
        )
        db.session.add(new_log)
        db.session.commit()

        # 3. Return the saved object
        return jsonify(new_log.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        print("Error in /analyze:", e)
        return jsonify({"msg": "Error analyzing/saving mood."}), 500

@app.route("/mood_history", methods=["GET"])
@jwt_required()
def get_mood_history():
    user_id = get_jwt_identity()
    # Fetch logs for this user, newest first
    logs = MoodLog.query.filter_by(user_id=int(user_id)).order_by(MoodLog.date.desc()).all()
    return jsonify([log.to_dict() for log in logs]), 200

@app.route("/mood_history", methods=["DELETE"])
@jwt_required()
def clear_mood_history():
    user_id = get_jwt_identity()
    try:
        MoodLog.query.filter_by(user_id=int(user_id)).delete()
        db.session.commit()
        return jsonify({"msg": "Mood history cleared"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to clear history"}), 500

class Habit(db.Model):
    __tablename__ = "Habits"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    target = db.Column(db.Float, nullable=False)
    current = db.Column(db.Float, default=0.0)
    unit = db.Column(db.String(50))
    color = db.Column(db.String(20), default='#0d6efd')
    last_updated = db.Column(db.Date, default=datetime.utcnow().date())

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "target": self.target,
            "current": self.current,
            "unit": self.unit,
            "color": self.color,
            "last_updated": self.last_updated.isoformat()
        }  
    


# --- GET all habits and POST a new habit ---
@app.route('/habits', methods=['GET', 'POST'])
@jwt_required()
def handle_habits():
    user_id = get_jwt_identity()
    today = datetime.utcnow().date()

    if request.method == 'GET':
        habits = Habit.query.filter_by(user_id=user_id).all()
        
        # --- NEW: Check and Create Defaults if missing ---
        existing_names = [h.name for h in habits]
        defaults = [
            {"name": "Water Intake", "target": 8, "unit": "Glasses", "color": "#0d6efd"},
            {"name": "Daily Steps", "target": 10000, "unit": "Steps", "color": "#198754"},
            {"name": "Coding", "target": 2, "unit": "Hours", "color": "#6610f2"}
        ]
        
        for d in defaults:
            if d["name"] not in existing_names:
                new_d = Habit(user_id=user_id, name=d["name"], target=d["target"], 
                              unit=d["unit"], color=d["color"], current=0.0, last_updated=today)
                db.session.add(new_d)
        
        if any(d["name"] not in existing_names for d in defaults):
            db.session.commit()
            habits = Habit.query.filter_by(user_id=user_id).all() # Refresh list

        # Daily Refresh Logic
        for h in habits:
            if h.last_updated < today:
                h.current = 0
                h.last_updated = today
        db.session.commit()
        return jsonify([h.to_dict() for h in habits]), 200

    # POST logic remains the same...

    if request.method == 'POST':
        data = request.get_json()
        new_habit = Habit(
            user_id=user_id,
            name=data.get('name'),
            target=data.get('target'),
            unit=data.get('unit'),
            color=data.get('color', '#0d6efd'),
            current=0.0,
            last_updated=today
        )
        db.session.add(new_habit)
        db.session.commit()
        return jsonify(new_habit.to_dict()), 201

# --- UPDATE (Increment) or DELETE a specific habit ---
@app.route('/habits/<int:habit_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_single_habit(habit_id):
    user_id = get_jwt_identity()
    habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first_or_404()

    if request.method == 'PUT':
        data = request.get_json()
        if 'current' in data:
            habit.current = data['current']
        
        habit.last_updated = datetime.utcnow().date()
        db.session.commit()
        return jsonify(habit.to_dict()), 200

    if request.method == 'DELETE':
        db.session.delete(habit)
        db.session.commit()
        return jsonify({"message": "Habit deleted"}), 200   
    
class SelfLoveProgress(db.Model):
    __tablename__ = "self_love_progress"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chapter_id = db.Column(db.Integer, nullable=False)
    week_id = db.Column(db.Integer, nullable=False)
    answers = db.Column(db.JSON, nullable=False) # Stores the dict of answers
    ai_feedback = db.Column(db.Text, nullable=True) # Optional: store the AI response too
    date_completed = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "chapter_id": self.chapter_id,
            "week_id": self.week_id,
            "answers": self.answers,
            "ai_feedback": self.ai_feedback
        }
        
    # --- Self-Love Progress Routes ---

@app.route('/self-love/progress/<int:week_id>', methods=['GET'])
@jwt_required()
def get_progress(week_id):
    user_id = get_jwt_identity()
    progress = SelfLoveProgress.query.filter_by(user_id=int(user_id), week_id=week_id).first()
    if not progress:
        return jsonify({"answers": {}, "ai_feedback": ""}), 200
    return jsonify(progress.to_dict()), 200

@app.route('/self-love/save', methods=['POST'])
@jwt_required()
def save_progress():
    user_id = get_jwt_identity()
    data = request.json
    
    # Try to find existing progress for this specific week
    progress = SelfLoveProgress.query.filter_by(
        user_id=int(user_id), 
        week_id=data['week_id']
    ).first()
    
    if not progress:
        progress = SelfLoveProgress(
            user_id=int(user_id), 
            week_id=data['week_id'],
            chapter_id=data['chapter_id']
        )
        db.session.add(progress)
        
    progress.answers = data['answers']
    db.session.commit()
    
    return jsonify({"message": "Progress saved locally"}), 200


    user_id = get_jwt_identity()
    data = request.json
    week_title = data.get('week_title')
    reflections = data.get('reflections', {})
    
    # Build context from the user's answers
    user_context = "\n".join([f"Q/A: {val}" for key, val in reflections.items() if val])
    
    if not user_context:
        return jsonify({"feedback": "You didn't write much today, but remember that even showing up is a win. I'm proud of you for being here."})

    prompt = (
        f"Context: The user is completing a self-love workshop week titled '{week_title}'.\n"
        f"User Reflections:\n{user_context}\n\n"
        "Task: Act as an empathetic guide. Provide a 3-sentence response validating their effort "
        "and offering a gentle, warm thought. Do not use robotic 'As an AI' language."
    )
    
    try:
        # Using your existing model instance from the top of app.py
        response = model.generate_content(prompt)
        feedback_text = response.text

        # Optional: Save this feedback to the DB so it's there next time they log in
        # We find the progress they just saved in the previous call
        progress = SelfLoveProgress.query.filter_by(user_id=int(user_id), week_id=data.get('week_id')).first()
        if progress:
            progress.ai_feedback = feedback_text
            db.session.commit()

        return jsonify({"feedback": feedback_text})
    except Exception as e:
        print(f"AI Error: {e}")
        return jsonify({"feedback": "I'm listening and I'm so proud of the work you're putting in today."}), 200

# --- 3. DYNAMIC AI REFLECTION ROUTE ---
@app.route('/ai/reflect', methods=['POST'])
@jwt_required()
def get_ai_reflection():
    user_id = get_jwt_identity()
    data = request.json
    week_title = data.get('week_title', "this journey")
    reflections = data.get('reflections', {})
    
    # Check for custom AI Name to use in the persona
    settings = AssistantSettings.query.filter_by(user_id=user_id).first()
    ai_name = settings.name if settings else "Haven"
    
    # 1. Build context and calculate "Depth"
    user_context = "\n".join([f"- {val}" for val in reflections.values() if val])
    word_count = len(user_context.split())
    
    if not user_context.strip():
        return jsonify({"feedback": f"I'm here, even in the silence. Take your time, I'm proud of you for just opening this page today. — {ai_name}"})

    # 2. Dynamic Instructions based on word count
    if word_count > 150:
        depth_instruction = (
            "The user has shared a deep, vulnerable reflection. Respond with profound empathy and "
            "provide 3 distinct, thoughtful insights. Match their energy with a longer, soulful 3-paragraph reply."
        )
    elif word_count > 60:
        depth_instruction = (
            "The user provided good detail. Provide a warm, 2-paragraph response acknowledging their "
            "specific efforts and offering a gentle observation about their growth."
        )
    else:
        depth_instruction = (
            "The user was brief. Provide a short, 3-sentence encouraging nudge. "
            "Validate that even small steps are progress."
        )

    prompt = (
        f"You are {ai_name}, an empathetic and wise guide. "
        f"Context: The user is in a self-love workshop week: '{week_title}'.\n"
        f"User Reflections:\n{user_context}\n\n"
        f"Task: {depth_instruction} "
        "Do not use robotic 'As an AI' language. Speak directly to them with warmth."
    )
    
    try:
        # Using your global 'model' instance
        response = model.generate_content(prompt)
        feedback_text = response.text

        # Save feedback to DB
        progress = SelfLoveProgress.query.filter_by(user_id=int(user_id), week_id=data.get('week_id')).first()
        if progress:
            progress.ai_feedback = feedback_text
            db.session.commit()

        return jsonify({"feedback": feedback_text})
    except Exception as e:
        print(f"AI Error: {e}")
        return jsonify({"feedback": f"I'm listening, and I'm so proud of the work you're putting in today. — {ai_name}"}), 200


# --- 2. UPDATED USER PROFILE ROUTE ---
@app.route('/auth/user-profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        
        if not user:
            return jsonify({"msg": "User not found"}), 404

        # Check AssistantSettings for a custom name, fallback to "Haven"
        settings = AssistantSettings.query.filter_by(user_id=user_id).first()
        ai_name = settings.name if settings else "Haven"

        return jsonify({
            "display_name": user.display_name,
            "email": user.email,
            "ai_name": ai_name,
            "profile_pic": user.profile_pic
        }), 200
    except Exception as e:
        return jsonify({"msg": "Error fetching profile", "error": str(e)}), 500


# --- Run Flask app ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    # '0.0.0.0' tells Flask to accept connections from any device on your Wi-Fi
    app.run(host='0.0.0.0', port=5000, debug=True)
    



