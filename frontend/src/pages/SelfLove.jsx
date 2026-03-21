import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SelfLove.module.css';

const journeyData = {
  chapters: [
    {
      id: 1,
      title: "Chapter 1: The Root",
      description: "Laying the Foundation & Basic Kindness.",
      intro:
        "You don’t need to feel love to practice it. These steps will slowly teach your mind and heart to treat yourself better.",
      weeks: [
        {
          id: 1,
          title: "Week 1: Awareness & Presence",
          days: [
            {
              day: 1,
              task: "Say Your Name With Kindness",
              instruction:
                "Stand in front of the mirror. Say: 'Hi [Name]. I’m learning to love you.' Say it softly, even if it feels silly or brings emotion.",
              prompt:
                "How did it feel to hear your name spoken with kindness?"
            },
            {
              day: 2,
              task: "Write a 'Proud of Me' Note",
              instruction:
                "Write: 'Today, I’m proud of myself because…' Even small things like getting out of bed or trying count.",
              prompt:
                "Today, I’m proud of myself because…"
            },
            {
              day: 3,
              task: "Give Yourself Permission to Rest",
              instruction:
                "Take one hour today to do nothing productive. No guilt. Breathe, nap, listen to music, or watch something calming.",
              prompt:
                "How did it feel to rest without trying to earn it?"
            },
            {
              day: 4,
              task: "List What Makes You Lovable",
              instruction:
                "Write down five things about you that are beautiful, even if no one else sees them.",
              prompt:
                "Which quality was hardest to write down, and why?"
            },
            {
              day: 5,
              task: "Say No Without Explaining",
              instruction:
                "If something drains your energy today, practice saying: 'I don’t think I can, but thank you.' You don’t owe explanations.",
              prompt:
                "How did it feel to protect your peace today?"
            },
            {
              day: 6,
              task: "Talk to Yourself Like a Friend",
              instruction:
                "When you notice self-criticism, pause and ask: 'Would I say this to someone I love?' Replace it with gentleness.",
              prompt:
                "What kinder words did you choose for yourself today?"
            },
            {
              day: 7,
              task: "Do One Kind Thing For Your Body",
              instruction:
                "Do one gentle act to thank your body—apply lotion slowly, take a walk, or say: 'This body carried me through pain. I’m grateful.'",
              prompt:
                "How did your body feel after being treated with kindness?"
            }
          ],
          reflection: [
            "What was the most comforting part of this week?",
            "What was the hardest part to do or believe?",
            "Did anything surprise you about how you treated yourself?",
            "How do you feel about yourself now compared to a week ago?"
          ]
        },
       {
  id: 2,
  title: "Week 2: Healing How You See Yourself",
  days: [
    {
      day: 1,
      task: "What They Told You vs. What’s True",
      instruction:
        "Write two columns. One titled 'What They Said' and the other 'What’s Actually True'. Write old messages you were told, then reframe them with truth. When done, tear up or destroy the first column.",
      prompt:
        "How did it feel to separate their words from your truth?"
    },
    {
      day: 2,
      task: "The Mirror Exercise (Deeper)",
      instruction:
        "Look into the mirror and whisper: 'This is my face. These are my eyes. This is the girl who survived so much.' Stay until you feel a small sense of compassion.",
      prompt:
        "What emotions came up while looking at yourself this way?"
    },
    {
      day: 3,
      task: "Writing to Your Body",
      instruction:
        "Write a gentle message to your body. Acknowledge what it has carried you through and thank it for surviving with you.",
      prompt:
        "What did you feel when you wrote to your body?"
    },
    {
      day: 4,
      task: "Reclaiming Your Story",
      instruction:
        "Reflect on parts of your story that feel hard to accept or reclaim. Gently acknowledge them without judgment.",
      prompt:
        "Was there a part of your story that felt difficult to reclaim?"
    },
    {
      day: 5,
      task: "Speaking Kindly Through the Mirror",
      instruction:
        "Stand in front of the mirror and speak to yourself with kindness, as if you were encouraging someone you love.",
      prompt:
        "How did it feel to speak kindly to yourself?"
    },
    {
      day: 6,
      task: "Listing What You Like About Yourself",
      instruction:
        "Write a list of things you like about yourself—small or big, physical or internal.",
      prompt:
        "Did anything shift as you listed things you like about yourself?"
    },
    {
      day: 7,
      task: "Letter to Who You Are Becoming",
      instruction:
        "Write a short letter describing the version of yourself you are becoming. Focus on growth, not perfection.",
      prompt:
        "Who is the version of you that you described?"
    }
  ],
  reflection: [
    "What did you feel when you wrote to your body?",
    "Was there a part of your story you found hard to reclaim?",
    "How did it feel to speak kindly to yourself through the mirror?",
    "Did anything shift inside you when you listed things you like about yourself?",
    "Who is the version of “you” you described in your letter—who are you becoming?"
  ]
},
{
  id: 3,
  title: "Week 3: Rebuilding Trust With Yourself",
  days: [
    {
      day: 1,
      task: "Keep One Tiny Promise",
      instruction:
        "Choose one small promise for today (e.g., drink water, stretch, journal). Say: 'I will show up for you—just this once, just today.' Then do it.",
      prompt:
        "What promise did you make to yourself today, and how did it feel to keep it?"
    },
    {
      day: 2,
      task: "Write a Letter of Apology to Yourself",
      instruction:
        "Write an apology letter to yourself from love, not shame. Begin with: 'Dear me, I’m sorry for ignoring your feelings when…' End with: 'I’m learning to listen now.'",
      prompt:
        "What did writing this letter reveal about how you’ve treated yourself?"
    },
    {
      day: 3,
      task: "Track One Emotion",
      instruction:
        "Choose one emotion to observe throughout the day. Notice when it appears, what triggers it, and what you needed in those moments.",
      prompt:
        "What did you notice about this emotion and your needs today?"
    },
    {
      day: 4,
      task: "Celebrate a Win (Big or Small)",
      instruction:
        "Write down one win from today. Say out loud: 'I did this. And I’m proud of me.' Celebrate it in a small, meaningful way.",
      prompt:
        "How did it feel to acknowledge and celebrate yourself today?"
    },
    {
      day: 5,
      task: "Create a Safe List",
      instruction:
        "Write a list of 3–5 things, people, or activities that help you feel safe or grounded. Keep it somewhere you can return to when needed.",
      prompt:
        "How does it feel knowing you have a list of things that bring you safety?"
    }
  ],
  reflection: [
    "What was your tiny promise on Day 1, and how did it feel to keep it?",
    "What did your apology letter to yourself reveal?",
    "Was there an emotion that surprised you or kept showing up?",
    "How did it feel to celebrate yourself this week?",
    "Has your relationship with yourself shifted in any way this week?"
  ]
},
{
  id: 4,
  title: "Week 4: Becoming Your Own Safe Place",
  days: [
    {
      day: 1,
      task: "Make a Comfort Corner",
      instruction:
        "Create a physical or emotional space just for you. It may include a blanket, sketches, a Bible verse or affirmation, a photo, candle, or quote. Say aloud: 'This is my space. I am allowed to rest here. I belong here.'",
      prompt:
        "How did it feel to create a space that felt safe and only yours?"
    },
    {
      day: 2,
      task: "Speak to Your Inner Child",
      instruction:
        "Find a quiet moment. Close your eyes and picture yourself as a child. Speak to her gently and reassure her that she is seen, supported, and not alone. Then write what she would want you to know.",
      prompt:
        "What emotions or messages came up when you connected with your inner child?"
    },
    {
      day: 3,
      task: "Your Body Is Still Home",
      instruction:
        "Touch your skin softly—your arms, hair, or hands. Thank your body without trying to change it. Move gently in a way that feels safe, such as stretching, walking, or dancing.",
      prompt:
        "How did it feel to treat your body with kindness rather than judgment?"
    },
    {
      day: 4,
      task: "Create a Soothing Ritual",
      instruction:
        "Build a simple ritual that helps you feel okay on hard days, such as tea with music, prayer with breathing, or drawing or journaling. Say: 'I don’t abandon myself anymore. This is how I stay.'",
      prompt:
        "Did this ritual bring you a sense of calm, safety, or grounding?"
    },
    {
      day: 5,
      task: "Write to Your Future Self",
      instruction:
        "Write a letter to your future self. Begin with: 'Dear me, I know some days will still hurt. But please don’t forget…' Write what you hope she remembers about this healing.",
      prompt:
        "What do you hope your future self remembers most from this journey?"
    },
    {
      day: 6,
      task: "Be Emotionally Honest",
      instruction:
        "Be honest with someone you trust or with your journal. Instead of saying 'I’m fine,' try expressing how you truly feel, even if it’s messy or uncertain.",
      prompt:
        "How did it feel to be emotionally honest today?"
    },
    {
      day: 7,
      task: "Write a Thank You Note to Yourself",
      instruction:
        "Write a note beginning with: 'Thank you, [Name], for…' List the ways you have shown up, tried, stayed, and kept going. End by acknowledging your effort.",
      prompt:
        "What parts of yourself did you feel most grateful for?"
    }
  ],
  reflection: [
    "How did it feel to create a comfort corner—physically or emotionally?",
    "What did your inner child say or feel when you spoke to her?",
    "Did the ritual you created bring you peace or safety?",
    "What did you write to your future self, and how do you hope she’ll feel when she reads it one day?",
    "What did your thank-you note to yourself say? What are you most proud of?"
  ]
},
{
    id: 5,
    title:"certificate: The Seed of Worth"
}
 ]
       },
       
         {
      id: 2,
      title: "Chapter 2: The Inner Critic",
      description: "Understanding Where Self Criticism Comes From.",
      intro:
        "The goal is not to silence the critic instantly but to listen deeply, trace it's roots and gain compassion for why it exists",
      weeks: [
        {
  id: 1,
  title: "Week 1: The Voice Inside Your Head",
  days: [
    {
      day: 1,
      task: "Name Your Inner Critic",
      instruction: "Give your inner critic a name and write down common phrases it uses. Respond to each with a kinder, truthful counter-voice.",
      prompt: "What is the name of your inner critic? What phrases does it usually say, and how can you respond with truth?"
    },
    {
      day: 2,
      task: "Track the Triggers",
      instruction: "Notice when your inner critic becomes loud. Identify the situations and explore what it fears.",
      prompt: "When does your inner critic appear most, and what is it trying to protect you from?"
    },
    {
      day: 3,
      task: "Write a Self-Talk Dialogue",
      instruction: "Create a written dialogue between your Inner Critic and your Wiser Self. Let the wiser voice respond calmly and honestly.",
      prompt: "What would your wiser self say back to the critic?"
    },
    {
      day: 4,
      task: "The Mirror Reframe",
      instruction: "Stand in front of a mirror. Notice the criticism, then gently speak counter-truths aloud.",
      prompt: "What kinder truths can you say to yourself when you look in the mirror?"
    },
    {
      day: 5,
      task: "Rewrite One Old Belief",
      instruction: "Choose one painful belief you’ve carried and consciously replace it with a gentler, truer statement.",
      prompt: "What belief are you releasing, and what truth will you live with instead?"
    },
    {
      day: 6,
      task: "Affirm Your Voice",
      instruction: "Write 5 affirmations that feel honest today. Speak them aloud or record your voice to hear them.",
      prompt: "What truths feel real and grounding for you today?"
    },
    {
      day: 7,
      task: "Write a Letter to the Old Voice",
      instruction: "Write a letter to your inner critic. Acknowledge its intent, but choose a kinder path moving forward.",
      prompt: "What do you want to say to the voice that once controlled you?"
    }
  ],
  reflection: [
    "What did I learn about where my inner critic comes from?",
    "How did it feel to respond with kindness instead of punishment?",
    "Which moment this week made me feel the most seen or understood?",
    "What changed when I allowed myself to be imperfect yet worthy?",
    "How would my life feel if my wiser voice became louder than my critic?"
  ]
},
{
  id: 2,
  title: "Week 2: What Shaped the Critic",
  days: [
    {
      day: 1,
      task: "Naming the Sources",
      instruction: "Write down specific people, situations, or environments where you remember feeling judged, shamed, or 'never enough'. Recall both big events and small repeated patterns.",
      prompt: "Who or what first contributed to the voice of your critic? When did you first hear it?"
    },
    {
      day: 2,
      task: "The Language of the Critic",
      instruction: "Recall exact phrases your critic uses and where you might have first heard them. Notice phrases that resemble someone you know (parent, teacher, sibling, friend).",
      prompt: "Which phrases sound like someone else’s voice? How does that help you separate your critic from yourself?"
    },
    {
      day: 3,
      task: "The Role the Critic Played",
      instruction: "Reflect on whether your critic tried to protect you (e.g., warning you to avoid failure) or if it mostly punished you. Imagine a job description for the critic in your life.",
      prompt: "If your inner critic had a job description, what would it say? Was it mostly protective or punishing?"
    },
    {
      day: 4,
      task: "Triggers & Patterns",
      instruction: "Notice when your critic speaks the loudest, such as before starting something new, after a mistake, or around certain people. Record the situations and your emotions at the time.",
      prompt: "When is your inner critic loudest, and how do you feel in those moments?"
    },
    {
      day: 5,
      task: "Connecting the Dots",
      instruction: "Review notes from Days 1–4. Draw a timeline showing when and how your critic developed. Remind yourself: the critic’s voice is learned, not the truth.",
      prompt: "What patterns emerge when you map the critic’s voice over time?"
    },
    {
      day: 6,
      task: "Compassion for the Past Self",
      instruction: "Write a letter to your younger self who first heard the critic. Acknowledge their experience and assure them they are safe now.",
      prompt: "What would you say to your younger self to offer comfort and safety?"
    },
    {
      day: 7,
      task: "Reflection & Release",
      instruction: "Reread your writings from the week. Notice new insights or patterns you hadn’t seen before. Close the week with a grounding activity such as music, poetry, or journaling.",
      prompt: "What new understanding did you gain about your inner critic this week? How can you release or soften its hold?"
    }
  ],
  reflection: [
    "What did I discover about where my inner critic came from?",
    "Which phrases or messages felt the most familiar or repeated?",
    "How did it feel to see the critic as separate from me?",
    "What protective or punishing patterns did I notice?",
    "How can I offer compassion to my past self now?"
  ]
},
{
  id: 3,
  title: "Week 3: What is the Critic Trying to Protect?",
  days: [
    {
      day: 1,
      task: "Ask the Voice: What Are You Afraid Of?",
      instruction: "Write down one common critic phrase. Underneath it, finish the sentence: 'Because if this happens, then…'. Dig into the fear beneath the words.",
      prompt: "What is the deeper fear hiding under this critical thought?"
    },
    {
      day: 2,
      task: "List the Fears",
      instruction: "Make a list of what your inner critic is truly afraid of (e.g., failure, rejection, embarrassment, disappointment). Notice how human these fears are.",
      prompt: "Which fears show up most often for you?"
    },
    {
      day: 3,
      task: "Offer Reassurance",
      instruction: "For each fear you listed, write one gentle reassurance — the kind you would offer a close friend.",
      prompt: "What does your fear need to hear in order to feel calmer?"
    },
    {
      day: 4,
      task: "Transform the Voice",
      instruction: "Choose one critic phrase and rewrite it as if it came from love instead of fear.",
      prompt: "How would this message sound if it were trying to support you rather than protect you harshly?"
    },
    {
      day: 5,
      task: "Fear Voice vs Hope Voice",
      instruction: "Write a short dialogue between your Fear Voice and your Hope Voice. Let fear speak honestly — then allow hope to respond with compassion.",
      prompt: "What does hope know that fear doesn’t?"
    },
    {
      day: 6,
      task: "Bring Safety Into the Body",
      instruction: "When the critic appears today, place your hand on your heart and say quietly: 'I hear you. Thank you for trying to protect me. But I’m safe now.'",
      prompt: "How does your body respond when you offer reassurance instead of resistance?"
    },
    {
      day: 7,
      task: "Weekly Reflection",
      instruction: "Reflect on the fears, reassurances, and new insights from this week.",
      prompt: "What might change if you trusted the gentle voice more often?"
    }
  ],
  reflection: [
    "Which fear felt the most real or familiar?",
    "Which reassurance brought even a small sense of relief?",
    "How did it feel to treat the critic as protective rather than cruel?",
    "What did this week teach you about emotional safety?",
    "What would it look like to choose the gentle voice more often?"
  ]
},



{
    id:4,
    title: "Certificate: The Voice Tamer"

}


      ]
       },
       {
        id: 3,
        title:"Chapter 3: The Nurturer",
        description:"Meeting a New Voice - The Inner Nurturer",
        intro:"Meeting the part of you that speaks gently, reassures, and guides. The opposite of the critic. It may feel awkward at first but over time it becomes your true inner coach.",
        weeks:[
            {
  id: 1,
  title: "Week 1: Meeting the Inner Nurturer",
  days: [
    {
      day: 1,
      task: "Imagine the Nurturer",
      instruction: "Close your eyes and imagine someone (real, fictional, symbolic, or future-you) who makes you feel safe, accepted, and cared for. This could even be an animal or a natural presence.",
      prompt: "What do they sound like? How do they look at you? What words would they use when you’re struggling?"
    },
    {
      day: 2,
      task: "Name or Visualize the Nurturer",
      instruction: "Give your Inner Nurturer a name and, if helpful, an image or description. They don’t need to be perfect — only present and kind.",
      prompt: "How does this presence feel to you?"
    },
    {
      day: 3,
      task: "Rewrite a Critic Phrase as the Nurturer",
      instruction: "Choose one familiar critic phrase and rewrite it as if it were spoken by your Inner Nurturer — from love instead of fear.",
      prompt: "How does the message change when it comes from care rather than criticism?"
    },
    {
      day: 4,
      task: "Journal in the Nurturer’s Voice",
      instruction: "Spend 5–10 minutes writing as if your Inner Nurturer is speaking directly to you. Let the words flow naturally — reassurance, encouragement, reminders, or comfort.",
      prompt: "What does this voice want you to know today?"
    },
    {
      day: 5,
      task: "Letter from the Nurturer",
      instruction: "Write a compassionate letter to yourself beginning with: 'Dear [Your Name], I see how hard you’ve been trying…' End it with warmth and reassurance.",
      prompt: "What would someone who truly sees you want to tell you?"
    },
    {
      day: 6,
      task: "Carry the Nurturer With You",
      instruction: "When the inner critic appears today, pause and ask: 'What would my Inner Nurturer say instead?' Write the response down.",
      prompt: "How does it feel to respond with gentleness rather than judgment?"
    },
    {
      day: 7,
      task: "Weekly Reflection",
      instruction: "Reflect on your experience meeting and practicing this new inner voice.",
      prompt: "How can you begin inviting this voice more often into your daily life?"
    }
  ],
  reflection: [
    "Did the Nurturer’s voice feel natural or unfamiliar at first?",
    "Which words or messages felt the most comforting?",
    "What differences did you notice between the critic and the nurturer?",
    "When might you need this voice the most?",
    "What would change if this voice guided you more often?"
  ]
},
{
  id: 2,
  title: "Week 2: Dialogue Between the Critic & the Nurturer",
  days: [
    {
      day: 1,
      task: "Set the Stage",
      instruction: "Imagine the Critic in one chair and the Nurturer in another. You are the observer. Write short exchanges between them.",
      prompt: "What does the Critic say? How does the Nurturer respond?"
    },
    {
      day: 2,
      task: "Short Conversation",
      instruction: "Pick one common Critic phrase and let the Nurturer respond back. Keep it brief and supportive.",
      prompt: "How does the Nurturer’s response feel different from your usual self-talk?"
    },
    {
      day: 3,
      task: "Let Them Argue (Briefly)",
      instruction: "Allow the Critic to push harder than usual. Write how the Nurturer calmly and warmly holds its ground.",
      prompt: "Notice how the Nurturer maintains compassion and reassurance, even in the face of harsh criticism."
    },
    {
      day: 4,
      task: "Give the Nurturer the Last Word",
      instruction: "End today’s dialogue by letting the Nurturer have the final line. Reflect on how it feels compared to when the Critic dominates.",
      prompt: "How does the inner space feel when kindness has the last word?"
    },
    {
      day: 5,
      task: "Dialogue About the Past",
      instruction: "Write a short conversation where the Critic shames you for a past event and the Nurturer responds with compassion.",
      prompt: "How does the Nurturer help you reinterpret the past with gentleness?"
    },
    {
      day: 6,
      task: "Dialogue About the Future",
      instruction: "Write a short conversation where the Critic expresses worry about the future and the Nurturer reassures you.",
      prompt: "How can the Nurturer support you in facing future uncertainty?"
    },
    {
      day: 7,
      task: "Weekly Reflection",
      instruction: "Reflect on the week’s dialogues and exercises.",
      prompt: [
        "How did it feel to write both voices?",
        "Did the Nurturer feel stronger with practice?",
        "Which conversation gave the most relief or insight?",
        "How might you continue letting the Nurturer guide your inner dialogue?"
      ]
    }
  ],
  reflection: [
    "Notice how writing both voices affects your self-perception.",
    "Consider which voice is strongest and where you might want to shift the balance.",
    "Reflect on moments where the Nurturer brings comfort or clarity.",
    "Observe whether letting the Nurturer speak changes your reaction to the Critic.",
    "Think about how you can integrate this inner dialogue into daily life."
  ]
},
{
  id: 3,
  title: "Week 3: Living With Both Voices",
  days: [
    {
      day: 1,
      task: "Morning Check-in",
      instruction: "Before your day starts, write down one phrase the Critic usually whispers in the morning, and one phrase your Nurturer can say back.",
      prompt: "Notice how the Nurturer’s response changes the tone of your day."
    },
    {
      day: 2,
      task: "Spot the Critic in Action",
      instruction: "Pay attention when the Critic shows up during the day (mirror, mistake, conversation). Pause and whisper silently or aloud: 'I hear you, Critic. But I choose kindness.'",
      prompt: "How does acknowledging the Critic without obeying it feel?"
    },
    {
      day: 3,
      task: "Give Both Voices Space",
      instruction: "At night, write down one thing the Critic said today and one thing the Nurturer said. This helps you recognize both exist, but you get to choose which words guide you.",
      prompt: "Which words are helpful, which are harmful, and why?"
    },
    {
      day: 4,
      task: "Nurturer First",
      instruction: "All day, before the Critic even speaks, give yourself a Nurturer phrase first. Examples: 'I’m doing my best.' / 'I am learning slowly.' / 'It’s okay to not be perfect.'",
      prompt: "Notice how setting the tone with the Nurturer shifts your reactions."
    },
    {
      day: 5,
      task: "Gratitude to Both",
      instruction: "Write a short note of thanks to both voices:\n* To the Critic: 'Thank you for trying to protect me, even though you were harsh.'\n* To the Nurturer: 'Thank you for showing me gentleness and truth.'",
      prompt: "Reflect on what each voice has offered you and how it affects your growth."
    },
    {
      day: 6,
      task: "Living Together",
      instruction: "Draw or describe what it looks like when the Critic and Nurturer coexist inside you. Notice who is louder, who is calmer, and whose words you choose to follow.",
      prompt: "How do the Critic and Nurturer balance each other? How does it feel to witness them together?"
    },
    {
      day: 7,
      task: "Integration Reflection",
      instruction: "Journal about your week:\n* What shifts did you notice?\n* Did the Critic feel less scary when the Nurturer spoke back?\n* How might 'living with both' look in your daily life?",
      prompt: "Reflect on the experience of integrating both voices and what choices you have moving forward."
    }
  ],
  reflection: [
    "Notice the change in your perception of the Critic as you allow the Nurturer to respond.",
    "Observe moments where you can pause and choose whose voice to listen to.",
    "Reflect on feelings of safety, calm, and empowerment when the Nurturer is active.",
    "Consider how living with both voices gives you choice instead of fear.",
    "Think about how you can continue strengthening the Nurturer while acknowledging the Critic."
  ]
},
{
id:4,
title:"Certificate: The New Voice",
}

        ]
       }

    // ... Chapter 2, 3, 4
  ]
};


const SelfLoveApp = () => {
  const [activeChapter, setActiveChapter] = useState(null);
  const [activeWeek, setActiveWeek] = useState(null);
  const [inputs, setInputs] = useState({});

  const handleInputChange = (id, value) => {
    setInputs({ ...inputs, [id]: value });
  };

  // 1. Dashboard View (Chapters)
  if (!activeChapter) {
    return (
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">Self-Love Roadmap</h1>
          <p className="lead text-muted">A journey from the basics of kindness to the intricacies of your soul.</p>
        </header>
        <div className="row g-4">
          {journeyData.chapters.map((ch) => (
            <div key={ch.id} className="col-md-6" onClick={() => setActiveChapter(ch)}>
              <div className={`card ${styles.chapterCard} h-100 border-0 shadow-sm p-4`}>

                <h3>{ch.title}</h3>
                <p>{ch.description}</p>
                <span className={`badge ${styles.badge}`}>Start Journey</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Weeks View
  if (activeChapter && !activeWeek) {
    return (
      <div className="container py-5">
        <button className="btn btn-link mb-4 p-0 text-decoration-none" onClick={() => setActiveChapter(null)}>← Back to Chapters</button>
        <h2 className="mb-3">{activeChapter.title}</h2>
        <p className="mb-5">{activeChapter.intro}</p>
        <div className="row g-3">
          {activeChapter.weeks.map((wk) => (
            <div key={wk.id} className="col-12" onClick={() => setActiveWeek(wk)}>
              <div className={`card ${styles.weekCard} p-4 border-0 shadow-sm d-flex flex-row justify-content-between align-items-center`}>

                <h4 className="mb-0">{wk.title}</h4>
                <span className="text-muted"> ➡️</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Days View
  return (
    <div className="container py-5">
      <button className="btn btn-link mb-4 p-0 text-decoration-none" onClick={() => setActiveWeek(null)}>← Back to Weeks</button>
      <h2 className="mb-4 text-center">{activeWeek.title}</h2>
      
      {activeWeek.days.map((d) => (
        <div key={d.day} className={`card ${styles.dayCard} mb-4 border-0 shadow-sm p-4`}>
          <h5 className={`${styles.textPrimary} mb-3`}>Day {d.day}: {d.task}</h5>
          <p className="text-muted">{d.instruction}</p>
          <label className="form-label small fw-bold mt-2">{d.prompt}</label>
          <textarea 
          className={`form-control bg-light border-0 ${styles.textareaFocus}`}
            rows="3" 
            placeholder="Type your heart out..."
            onChange={(e) => handleInputChange(`ch${activeChapter.id}w${activeWeek.id}d${d.day}`, e.target.value)}
          ></textarea>
        </div>
      ))}

      <div className="reflection-section mt-5 p-4 rounded bg-white shadow-sm">
        <h4 className="mb-4">🌼 Reflection Check-In</h4>
        {activeWeek.reflection.map((q, idx) => (
          <div key={idx} className="mb-3">
            <p className="mb-1">{q}</p>
            <textarea className="form-control border-0 bg-light" rows="2"></textarea>
          </div>
        ))}
        <button className="btn btn-primary w-100 mt-3 py-3 rounded-pill shadow">Complete Week</button>
      </div>
    </div>
  );
};

export default SelfLoveApp;