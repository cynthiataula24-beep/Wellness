import './Suggestions.css';

function Suggestions({ response }) {
  if (!response) return null;

  const score = response.compound;

  let suggestion = "";
  let emoji = "";

  if (score >= 0.5) {
    emoji = "😊";
    suggestion = "You're feeling good! Keep up the positive energy ✨";
  } else if (score <= -0.5) {
    emoji = "💙";
    suggestion = "It seems you're feeling low. Try a deep breathing exercise.";
  } else {
    emoji = "📝";
    suggestion = "Your mood seems neutral — maybe try a short journaling session.";
  }

  return (
    <div className="suggestion-box">
      <h2>Your Mood Result {emoji}</h2>
      <p><strong>Sentiment Score:</strong> {score}</p>
      <p>{suggestion}</p>
    </div>
  );
}

export default Suggestions;
