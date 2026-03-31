package com.example.wellnessapp

object SelfLoveData {
    val chapters = listOf(
        // CHAPTER 1
        Chapter(
            id = 1,
            title = "Chapter 1: The Root",
            description = "You don’t need to feel love to practice it. These steps will slowly teach your mind and heart to treat yourself better.",
            intro = "You don’t need to feel love to practice it. These steps will slowly teach your mind and heart to treat yourself better.",
            weeks = listOf(
                Week(
                    id = 1,
                    title = "Week 1: Awareness & Presence",
                    days = listOf(
                        DayTask(1, "Say Your Name With Kindness", "Stand in front of the mirror. Say: 'Hi [Name]. I’m learning to love you.'", "How did it feel to hear your name spoken with kindness?"),
                        DayTask(2, "Write a 'Proud of Me' Note", "Write: 'Today, I’m proud of myself because…' Even small things count.", "Today, I’m proud of myself because…"),
                        DayTask(3, "Give Yourself Permission to Rest", "Take one hour today to do nothing productive. No guilt.", "How did it feel to rest without trying to earn it?"),
                        DayTask(4, "List What Makes You Lovable", "Write down five things about you that are beautiful.", "Which quality was hardest to write down, and why?"),
                        DayTask(5, "Say No Without Explaining", "Practice saying: 'I don’t think I can, but thank you.'", "How did it feel to protect your peace today?"),
                        DayTask(6, "Talk to Yourself Like a Friend", "When you notice self-criticism, ask: 'Would I say this to a loved one?'", "What kinder words did you choose for yourself today?"),
                        DayTask(7, "Do One Kind Thing For Your Body", "Apply lotion slowly or take a walk. Say: 'I’m grateful for this body.'", "How did your body feel after being treated with kindness?")
                    ),
                    reflection = listOf(
                        "What was the most comforting part of this week?",
                        "What was the hardest part to do or believe?",
                        "How do you feel about yourself now compared to a week ago?"
                    )
                ),
                Week(
                    id = 2,
                    title = "Week 2: Healing How You See Yourself",
                    days = listOf(
                        DayTask(1, "What They Told You vs. True", "Write 'What They Said' vs 'What’s Actually True'. Reframe old messages.", "How did it feel to separate their words from your truth?"),
                        DayTask(2, "The Mirror Exercise (Deeper)", "Whisper: 'This is the girl who survived so much.' Stay until you feel compassion.", "What emotions came up while looking at yourself?"),
                        DayTask(3, "Writing to Your Body", "Write a gentle message acknowledging what your body has carried.", "What did you feel when you wrote to your body?"),
                        DayTask(4, "Reclaiming Your Story", "Gently acknowledge hard parts of your story without judgment.", "Was there a part of your story that felt difficult to reclaim?"),
                        DayTask(5, "Speaking Kindly", "Speak to yourself in the mirror as if encouraging a loved one.", "How did it feel to speak kindly to yourself?"),
                        DayTask(6, "Listing Likes", "Write a list of things you like about yourself—physical or internal.", "Did anything shift as you listed things you like?"),
                        DayTask(7, "Letter to Who You Are Becoming", "Describe the version of yourself you are becoming (growth-focused).", "Who is the version of you that you described?")
                    ),
                    reflection = listOf(
                        "Was there a part of your story you found hard to reclaim?",
                        "How did it feel to speak kindly to yourself through the mirror?",
                        "Who are you becoming?"
                    )
                ),
                Week(
                    id = 3,
                    title = "Week 3: Rebuilding Trust With Yourself",
                    days = listOf(
                        DayTask(1, "Keep One Tiny Promise", "Choose one small promise (e.g. drink water) and do it for yourself.", "How did it feel to keep this promise?"),
                        DayTask(2, "Letter of Apology", "Write an apology from love: 'Dear me, I’m sorry for ignoring you...' ", "What did this letter reveal about your self-treatment?"),
                        DayTask(3, "Track One Emotion", "Observe one emotion today. What triggers it? What do you need?", "What did you notice about your needs today?"),
                        DayTask(4, "Celebrate a Win", "Write one win and say out loud: 'I’m proud of me.'", "How did it feel to celebrate yourself today?"),
                        DayTask(5, "Create a Safe List", "Write 3–5 things/people that help you feel grounded.", "How does it feel to know you have a 'Safe List'?")
                    ),
                    reflection = listOf(
                        "What did your apology letter reveal?",
                        "How did it feel to celebrate yourself this week?",
                        "Has your relationship with yourself shifted?"
                    )
                ),
                Week(
                    id = 4,
                    title = "Week 4: Becoming Your Own Safe Place",
                    days = listOf(
                        DayTask(1, "Make a Comfort Corner", "Create a space with a blanket or candle. Say: 'I belong here.'", "How did it feel to create a space only for you?"),
                        DayTask(2, "Speak to Your Inner Child", "Picture yourself as a child. Reassure her she is not alone.", "What messages came up when connecting with your inner child?"),
                        DayTask(3, "Your Body Is Still Home", "Touch your skin softly. Move in a way that feels safe.", "How did it feel to treat your body with kindness?"),
                        DayTask(4, "Create a Soothing Ritual", "Build a simple ritual (tea, music, prayer). Say: 'I don't abandon myself.'", "Did this ritual bring you a sense of calm?"),
                        DayTask(5, "Write to Your Future Self", "Begin with: 'Dear me, please don’t forget...' about this healing.", "What do you hope your future self remembers most?"),
                        DayTask(6, "Be Emotionally Honest", "Instead of 'I'm fine,' express how you truly feel to a journal or friend.", "How did it feel to be emotionally honest?"),
                        DayTask(7, "Thank You Note", "Write a note: 'Thank you, [Name], for staying and keeping going.'", "What parts of yourself are you most grateful for?")
                    ),
                    reflection = listOf(
                        "What did your inner child say or feel?",
                        "What are you most proud of from this first month?"
                    )
                )
            )
        ),

        // CHAPTER 2
        Chapter(
            id = 2,
            title = "Chapter 2: The Inner Critic",
            description = "The goal is not to silence the critic instantly but to listen deeply, trace its roots and gain compassion for why it exists.",
            intro = "The goal is not to silence the critic instantly but to listen deeply, trace its roots and gain compassion for why it exists.",
            weeks = listOf(
                Week(
                    id = 5, // Continuing the ID sequence
                    title = "Week 1: The Voice Inside Your Head",
                    days = listOf(
                        DayTask(1, "Name Your Inner Critic", "Give the critic a name. Respond to its phrases with truthful counters.", "What is the name of your critic and your truthful response?"),
                        DayTask(2, "Track the Triggers", "Identify situations where the voice gets loud. What does it fear?", "When does it appear most and what is it protecting?"),
                        DayTask(3, "Write a Dialogue", "Write a dialogue between your Critic and your Wiser Self.", "What would your wiser self say back?"),
                        DayTask(4, "The Mirror Reframe", "Stand in the mirror. Notice the criticism, then speak counter-truths.", "What kinder truths can you say aloud?"),
                        DayTask(5, "Rewrite One Old Belief", "Replace one painful belief with a gentler, truer statement.", "What truth will you live with instead?"),
                        DayTask(6, "Affirm Your Voice", "Write and speak 5 grounding affirmations.", "What truths feel real and grounding today?"),
                        DayTask(7, "Letter to the Old Voice", "Acknowledge the critic's intent but choose a kinder path moving forward.", "What do you want to say to the voice that once controlled you?")
                    ),
                    reflection = listOf(
                        "How did it feel to respond with kindness instead of punishment?",
                        "What changed when you allowed yourself to be imperfect?"
                    )
                ),
                Week(
                    id = 6,
                    title = "Week 2: What Shaped the Critic",
                    days = listOf(
                        DayTask(1, "Naming the Sources", "Write down environments where you felt judged or 'never enough'.", "Who or what first contributed to this voice?"),
                        DayTask(2, "The Language of the Critic", "Identify phrases that sound like someone else's voice (parent/teacher).", "Which phrases sound like someone else?"),
                        DayTask(3, "The Role it Played", "Did your critic try to protect you or just punish you?", "If the critic had a job description, what would it say?"),
                        DayTask(4, "Triggers & Patterns", "Notice if the critic speaks loudest before mistakes or new tasks.", "When is it loudest and how do you feel?"),
                        DayTask(5, "Connecting the Dots", "Map out a timeline of how the critic developed. It was learned.", "What patterns emerge on your timeline?"),
                        DayTask(6, "Compassion for Past Self", "Write to your younger self who first heard the critic. Reassure them.", "What would you say to offer comfort and safety?"),
                        DayTask(7, "Reflection & Release", "Reread your week's insights. Close with a grounding activity.", "What new understanding did you gain?")
                    ),
                    reflection = listOf(
                        "How did it feel to see the critic as separate from you?",
                        "How can you offer compassion to your past self now?"
                    )
                ),
                Week(
                    id = 7,
                    title = "Week 3: What is the Critic Protecting?",
                    days = listOf(
                        DayTask(1, "Ask: What Are You Afraid Of?", "Finish the sentence: 'Because if this happens, then...' for a critic phrase.", "What is the deeper fear hiding under the thought?"),
                        DayTask(2, "List the Fears", "List the core fears (failure, rejection, etc).", "Which fears show up most often?"),
                        DayTask(3, "Offer Reassurance", "Write a gentle reassurance for every fear you listed.", "What does your fear need to hear to feel calmer?"),
                        DayTask(4, "Transform the Voice", "Rewrite one critic phrase as if it came from love instead of fear.", "How would this sound if it were trying to support you?"),
                        DayTask(5, "Fear vs Hope", "Write a dialogue between Fear and Hope. Let Hope respond.", "What does Hope know that Fear doesn't?"),
                        DayTask(6, "Bring Safety to Body", "Place a hand on your heart: 'I hear you, but I'm safe now.'", "How does your body respond to this reassurance?"),
                        DayTask(7, "Weekly Reflection", "Reflect on fears, reassurances, and new insights.", "What might change if you trusted the gentle voice?")
                    ),
                    reflection = listOf(
                        "How did it feel to treat the critic as protective rather than cruel?",
                        "What did this week teach you about emotional safety?"
                    )
                )
            )
        ),

        // CHAPTER 3
        Chapter(
            id = 3,
            title = "Chapter 3: The Nurturer",
            description = "Meeting the part of you that speaks gently, reassures, and guides. Over time it becomes your true inner coach.",
            intro = "Meeting the part of you that speaks gently, reassures, and guides. Over time it becomes your true inner coach.",
            weeks = listOf(
                Week(
                    id = 8,
                    title = "Week 1: Meeting the Inner Nurturer",
                    days = listOf(
                        DayTask(1, "Imagine the Nurturer", "Visualize someone or something that makes you feel safe.", "What do they sound like? What words do they use?"),
                        DayTask(2, "Name the Nurturer", "Give this presence a name and a description.", "How does this presence feel to you?"),
                        DayTask(3, "Rewrite for Love", "Rewrite a critic phrase as spoken by the Nurturer.", "How does the message change when it comes from care?"),
                        DayTask(4, "Journaling Voice", "Write for 10 minutes as if the Nurturer is speaking to you.", "What does this voice want you to know today?"),
                        DayTask(5, "Letter from Nurturer", "Write: 'Dear [Name], I see how hard you've been trying...'", "What would someone who truly sees you tell you?"),
                        DayTask(6, "Carry the Nurturer", "When the critic speaks today, ask: 'What would Nurturer say?'", "How does it feel to respond with gentleness?"),
                        DayTask(7, "Weekly Reflection", "Reflect on practicing this new inner voice.", "How can you invite this voice into daily life?")
                    ),
                    reflection = listOf(
                        "Did the Nurturer’s voice feel natural or unfamiliar?",
                        "What would change if this voice guided you more often?"
                    )
                ),
                Week(
                    id = 9,
                    title = "Week 2: Dialogue",
                    days = listOf(
                        DayTask(1, "Set the Stage", "Imagine the Critic and Nurturer in two chairs. Write an exchange.", "What does the Critic say? How does Nurturer respond?"),
                        DayTask(2, "Short Conversation", "Pick one phrase and let Nurturer respond briefly.", "How does this feel different from usual self-talk?"),
                        DayTask(3, "Hold the Ground", "Let the Critic push; write how Nurturer stays calm and warm.", "Notice how Nurturer maintains compassion."),
                        DayTask(4, "The Last Word", "Let the Nurturer have the final line today.", "How does the inner space feel when kindness wins?"),
                        DayTask(5, "Dialogue of the Past", "Let Nurturer respond to Critic shaming you for a past event.", "How does Nurturer help you reinterpret the past?"),
                        DayTask(6, "Dialogue of Future", "Let Nurturer reassure Critic's worry about the future.", "How can Nurturer support you in uncertainty?"),
                        DayTask(7, "Weekly Reflection", "Reflect on writing both voices.", "Did the Nurturer feel stronger with practice?")
                    ),
                    reflection = listOf(
                        "Notice how writing both voices affects your self-perception.",
                        "Which conversation gave the most relief?"
                    )
                ),
                Week(
                    id = 10,
                    title = "Week 3: Living With Both Voices",
                    days = listOf(
                        DayTask(1, "Morning Check-in", "Write one Critic whisper and one Nurturer response.", "How does this change the tone of your day?"),
                        DayTask(2, "Spot the Critic", "When it appears, whisper: 'I hear you, but I choose kindness.'", "How does acknowledging without obeying feel?"),
                        DayTask(3, "Give Both Space", "At night, record one thing each voice said.", "Which words are helpful and why?"),
                        DayTask(4, "Nurturer First", "Give yourself a Nurturer phrase before the Critic even speaks.", "Notice how setting the tone shifts your reactions."),
                        DayTask(5, "Gratitude to Both", "Write a thank you note to both voices for their roles.", "Reflect on how this affects your growth."),
                        DayTask(6, "Living Together", "Describe what coexistence looks like inside you.", "How do they balance each other?"),
                        DayTask(7, "Integration", "Journal about the shifts you noticed this week.", "Did the Critic feel less scary?")
                    ),
                    reflection = listOf(
                        "Does living with both voices give you choice instead of fear?",
                        "How will you continue strengthening the Nurturer?"
                    )
                )
            )
        )
    )
}