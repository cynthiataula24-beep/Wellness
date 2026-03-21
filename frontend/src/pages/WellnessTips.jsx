
import React, { useState, useEffect, useMemo } from 'react';
import "./WellnessTips.css";

// --- IMPORT ASSETS ---
import mindfulnessImg from "../assets/mindfulness.jpeg";
import sleepHygieneImg from "../assets/sleepHygiene.jpeg";
import stressManagementImg from "../assets/stressManagement.jpeg";
import digitalDetoxImg from "../assets/digitalDetox.jpeg";
import healthyEatingImg from "../assets/healthyEating.avif";
import natureTherapyImg from "../assets/natureTherapy.avif";
import socialConnectionImg from "../assets/socialConnection.jpeg";
import morningRoutineImg from "../assets/morningRoutines.avif";

import breathingImg from "../assets/breathing.jpeg";
import boxBreathingImg from "../assets/boxBreating.jpeg";
import neckRollsImg from "../assets/neckRolls.avif";
import gratitudeImg from "../assets/gratitude.avif";
import eyePalmingImg from "../assets/eyePalming.avif";
import groundingImg from "../assets/grounding.avif";

const initialArticles = [
 {
  id: 1,
  title: "Mindfulness",
  img: mindfulnessImg,
  content: (
    <>
      <h3>Mindfulness: A Practical Guide to Living with Awareness</h3>

      <p>
        In a fast-paced, distraction-filled world, mindfulness offers a simple yet powerful way to reconnect with the present moment.
        Rather than escaping life’s challenges, mindfulness helps us meet them with clarity, calm, and intention.
      </p>

      <p>
        This article explores what mindfulness is, why it matters, and how you can practice it in everyday life.
      </p>

      <h4>What Is Mindfulness?</h4>
      <p>
        Mindfulness is the practice of <strong>paying deliberate attention to the present moment</strong>, with an attitude of
        <strong> openness and non-judgment</strong>.
      </p>

      <p>It involves:</p>
      <ul>
        <li>Noticing your thoughts without getting carried away by them</li>
        <li>Becoming aware of your body, breath, and emotions</li>
        <li>Fully engaging with what is happening right now</li>
      </ul>

      <p>
        Mindfulness does not mean stopping your thoughts or always feeling calm—it means
        <strong> becoming aware of your inner experience without reacting automatically</strong>.
      </p>

      <h4>Why Mindfulness Matters</h4>
      <p>
        Modern life often pulls our attention in many directions at once. Mindfulness helps counter this by grounding us in the present.
      </p>

      <p><strong>Key Benefits of Mindfulness:</strong></p>
      <ul>
        <li>Reduces stress and anxiety by calming the nervous system</li>
        <li>Improves focus and concentration</li>
        <li>Enhances emotional regulation and self-awareness</li>
        <li>Promotes mental clarity and better decision-making</li>
        <li>Supports overall well-being and resilience</li>
      </ul>

      <p>
        Scientific studies have linked mindfulness to improved mental health, better sleep, and increased emotional balance.
      </p>

      <h4>Core Principles of Mindfulness</h4>
      <p>Mindfulness is guided by a few foundational attitudes:</p>
      <ul>
        <li><strong>Present-moment awareness</strong> – focusing on what is happening now</li>
        <li><strong>Non-judgment</strong> – observing without labeling experiences as good or bad</li>
        <li><strong>Acceptance</strong> – allowing experiences to be as they are</li>
        <li><strong>Curiosity</strong> – approaching each moment with openness</li>
        <li><strong>Patience</strong> – understanding that awareness develops over time</li>
      </ul>

      <p>These principles help shift our relationship with thoughts and emotions.</p>

      <h4>Simple Ways to Practice Mindfulness</h4>
      <p>
        Mindfulness does not require special equipment or long hours of meditation.
        Small, consistent practices can make a big difference.
      </p>

      <p><strong>1. Mindful Breathing</strong></p>
      <ul>
        <li>Sit comfortably and focus on your breath</li>
        <li>Notice the sensation of air entering and leaving your body</li>
        <li>Gently return your attention when the mind wanders</li>
      </ul>

      <p><strong>2. Body Awareness</strong></p>
      <ul>
        <li>Scan your body from head to toe</li>
        <li>Observe sensations without trying to change them</li>
        <li>Release tension where possible</li>
      </ul>

      <p><strong>3. Mindful Daily Activities</strong></p>
      <p>Practice mindfulness during routine tasks such as:</p>
      <ul>
        <li>Eating</li>
        <li>Walking</li>
        <li>Showering</li>
        <li>Washing dishes</li>
      </ul>

      <p>Pay attention to sensations, movements, and sounds.</p>

      <h4>Common Myths About Mindfulness</h4>
      <ul>
        <li>
          <strong>“Mindfulness means clearing the mind”</strong> – In reality, it’s about noticing thoughts, not eliminating them.
        </li>
        <li>
          <strong>“You need a lot of time to practice”</strong> – Even one minute of awareness can be effective.
        </li>
        <li>
          <strong>“Mindfulness is only meditation”</strong> – Mindfulness can be practiced at any moment during daily life.
        </li>
      </ul>

      <h4>Mindfulness in Everyday Life</h4>
      <p>Mindfulness can be integrated into various aspects of life:</p>
      <ul>
        <li><strong>At work:</strong> Improve focus and reduce burnout</li>
        <li><strong>In relationships:</strong> Listen more deeply and respond thoughtfully</li>
        <li><strong>During stress:</strong> Pause before reacting</li>
        <li><strong>In self-care:</strong> Cultivate kindness toward yourself</li>
      </ul>

      <p>
        Over time, mindfulness encourages a more intentional and balanced way of living.
      </p>

      <h4>Getting Started</h4>
      <ul>
        <li>Start small—1–5 minutes a day</li>
        <li>Be consistent rather than perfect</li>
        <li>Approach each session with kindness and curiosity</li>
        <li>Remember that mindfulness is a skill that grows with practice</li>
      </ul>

      <h4>Conclusion</h4>
      <p>
        Mindfulness is not about changing who you are; it’s about
        <strong> becoming aware of who you already are</strong>.
        By paying attention to the present moment with openness and compassion,
        you can develop greater clarity, emotional balance, and inner calm—one moment at a time.
      </p>
    </>
  )
},

 {
  id: 2,
  title: "Sleep Hygiene",
  img: sleepHygieneImg,
  content: (
    <>
      <h3>Sleep Hygiene: The Foundation of Restful, Restorative Sleep</h3>

      <p>
        Sleep is not a luxury—it is a biological necessity. Yet in today’s fast-paced, screen-filled world,
        quality sleep is often the first thing we sacrifice. Many people struggle with falling asleep,
        staying asleep, or waking up feeling refreshed. While sleep disorders exist, a large portion of
        sleep problems stem from poor sleep hygiene.
      </p>

      <p>
        Sleep hygiene refers to the daily habits, behaviors, and environmental factors that influence the
        quality and consistency of sleep. Practicing good sleep hygiene helps regulate the body’s internal
        clock, improves sleep quality, and supports overall physical and mental well-being.
      </p>

      <h4>Why Sleep Hygiene Matters</h4>
      <p>
        Good sleep is essential for nearly every system in the body. During sleep, the brain consolidates
        memories, the immune system strengthens, and the body repairs tissues. Poor sleep hygiene can lead to:
      </p>

      <ul>
        <li>Chronic fatigue and low energy</li>
        <li>Difficulty concentrating and impaired memory</li>
        <li>Mood disturbances such as irritability, anxiety, and depression</li>
        <li>Weakened immune function</li>
        <li>Increased risk of conditions like obesity, diabetes, and heart disease</li>
      </ul>

      <p>
        Improving sleep hygiene is one of the most effective and natural ways to improve sleep without medication.
      </p>

      <h4>Core Principles of Good Sleep Hygiene</h4>

      <p><strong>1. Maintain a Consistent Sleep Schedule</strong></p>
      <p>
        Going to bed and waking up at the same time every day—even on weekends—helps regulate your
        circadian rhythm (your internal biological clock). Irregular sleep schedules confuse the brain
        and make it harder to fall asleep naturally.
      </p>
      <p><em>Tip:</em> If you need to adjust your schedule, do so gradually in 15–30 minute increments.</p>

      <p><strong>2. Create a Sleep-Friendly Environment</strong></p>
      <p>Your bedroom should signal rest and relaxation. Environmental factors play a major role in sleep quality.</p>
      <ul>
        <li><strong>Light:</strong> Keep the room dark. Use blackout curtains or dim lighting.</li>
        <li><strong>Noise:</strong> Reduce disturbances with earplugs or white noise.</li>
        <li><strong>Temperature:</strong> A cool room (around 18–22°C or 65–72°F) is ideal.</li>
        <li><strong>Comfort:</strong> Invest in a comfortable mattress and pillows.</li>
      </ul>
      <p>Your bed should be associated with sleep—not work, stress, or entertainment.</p>

      <p><strong>3. Limit Screen Time Before Bed</strong></p>
      <p>
        Electronic devices emit blue light, which suppresses melatonin, the hormone responsible for sleep.
        Scrolling through social media or watching videos before bed stimulates the brain and delays sleep onset.
      </p>
      <p>
        <em>Tip:</em> Avoid screens at least 30–60 minutes before bedtime. Replace them with calming activities
        like reading, journaling, or light stretching.
      </p>

      <p><strong>4. Be Mindful of What You Consume</strong></p>
      <p>What you eat and drink, especially in the evening, affects sleep.</p>
      <ul>
        <li><strong>Caffeine:</strong> Avoid caffeine 6–8 hours before bedtime.</li>
        <li><strong>Alcohol:</strong> While alcohol may cause drowsiness, it disrupts deep sleep later in the night.</li>
        <li><strong>Heavy meals:</strong> Large or spicy meals close to bedtime can cause discomfort and indigestion.</li>
      </ul>
      <p>
        If you’re hungry before bed, choose a light snack such as fruit, yogurt, or nuts.
      </p>

      <p><strong>5. Establish a Relaxing Bedtime Routine</strong></p>
      <p>
        A consistent pre-sleep routine tells your body that it’s time to wind down.
        This helps transition from the busyness of the day to rest.
      </p>
      <ul>
        <li>Taking a warm shower</li>
        <li>Practicing deep breathing or meditation</li>
        <li>Reading a calming book</li>
        <li>Writing a short reflection or gratitude list</li>
      </ul>
      <p>
        The key is repetition—doing the same activities each night builds a strong sleep cue.
      </p>

      <p><strong>6. Use Your Bed Only for Sleep and Rest</strong></p>
      <p>
        Working, studying, or watching TV in bed weakens the mental association between bed and sleep.
        Over time, the brain may associate the bed with alertness rather than relaxation.
      </p>
      <p>
        If you can’t fall asleep within 20–30 minutes, get up and do a quiet, relaxing activity in dim light
        until you feel sleepy again.
      </p>

      <p><strong>7. Get Daytime Light and Physical Activity</strong></p>
      <p>
        Exposure to natural sunlight during the day helps regulate your circadian rhythm.
        Physical activity also promotes deeper sleep, especially when done earlier in the day.
      </p>
      <p>
        <em>Tip:</em> Aim for at least 20–30 minutes of daylight exposure and regular movement,
        but avoid intense exercise close to bedtime.
      </p>

      <h4>When Sleep Hygiene Isn’t Enough</h4>
      <p>
        While sleep hygiene improves sleep for many people, persistent sleep problems may indicate
        underlying issues such as insomnia, anxiety, depression, or sleep disorders.
        If difficulties continue despite good habits, seeking professional help is important.
      </p>

      <h4>Conclusion</h4>
      <p>
        Sleep hygiene is not about perfection—it’s about consistency and intention.
        Small, mindful changes to daily routines and sleep environments can lead to significant
        improvements in sleep quality and overall health.
      </p>
      <p>
        In a world that often glorifies productivity over rest, prioritizing sleep is an act of self-care
        and resilience. By nurturing healthy sleep habits, we give our minds and bodies the rest they need
        to function, heal, and thrive.
      </p>
    </>
  )
},

  {
  id: 3,
  title: "Stress Management",
  img: stressManagementImg,
  content: (
    <>
      <h3>Stress Management: Building Resilience in a Demanding World</h3>

      <p>
        Stress is a natural part of life. It helps us respond to challenges, meet deadlines,
        and adapt to change. However, when stress becomes chronic or overwhelming, it can take
        a serious toll on both physical and mental health. Learning how to manage stress
        effectively is not about eliminating it entirely, but about developing healthy ways
        to cope, recover, and regain balance.
      </p>

      <p>
        Stress management involves understanding the sources of stress, recognizing how it
        affects the body and mind, and applying practical strategies to reduce its negative impact.
      </p>

      <h4>Why Stress Management Matters</h4>
      <p>
        Short-term stress can sharpen focus and improve performance, but long-term stress keeps
        the body in a constant state of alert. This prolonged activation of the stress response
        can lead to:
      </p>

      <ul>
        <li>Persistent anxiety and irritability</li>
        <li>Fatigue and sleep disturbances</li>
        <li>Difficulty concentrating and memory problems</li>
        <li>Headaches, muscle tension, and digestive issues</li>
        <li>Increased risk of high blood pressure, heart disease, and depression</li>
      </ul>

      <p>
        Managing stress is essential for maintaining emotional well-being, physical health,
        and overall quality of life.
      </p>

      <h4>Understanding the Stress Response</h4>
      <p>
        When the brain perceives a threat, it activates the “fight-or-flight” response.
        Stress hormones such as cortisol and adrenaline are released, increasing heart rate,
        blood pressure, and alertness. While this response is helpful in emergencies,
        it becomes harmful when triggered constantly by work pressure, financial worries,
        or emotional strain.
      </p>

      <p>
        Effective stress management helps calm the nervous system and return the body
        to a state of balance.
      </p>

      <h4>Core Strategies for Managing Stress</h4>

      <p><strong>1. Identify Stress Triggers</strong></p>
      <p>
        The first step in managing stress is awareness. Understanding what causes stress—whether
        it is workload, relationships, uncertainty, or self-expectations—allows you to respond
        more intentionally.
      </p>
      <p><em>Tip:</em> Keep a short stress journal to note situations that trigger stress and how you react to them.</p>

      <p><strong>2. Practice Relaxation Techniques</strong></p>
      <p>
        Relaxation techniques help counteract the body’s stress response and promote calm.
      </p>
      <ul>
        <li>Deep breathing exercises</li>
        <li>Progressive muscle relaxation</li>
        <li>Mindfulness or meditation</li>
        <li>Gentle yoga or stretching</li>
      </ul>
      <p>
        Even a few minutes a day can significantly reduce stress levels over time.
      </p>

      <p><strong>3. Manage Time and Set Boundaries</strong></p>
      <p>
        Poor time management and overcommitment are common sources of stress. Learning to
        prioritize tasks and set realistic limits protects mental energy.
      </p>
      <ul>
        <li>Break large tasks into smaller steps</li>
        <li>Use to-do lists or planners</li>
        <li>Learn to say no without guilt</li>
        <li>Schedule breaks and rest periods</li>
      </ul>
      <p>
        Boundaries are not selfish—they are necessary for long-term well-being.
      </p>

      <p><strong>4. Take Care of Your Body</strong></p>
      <p>
        Physical health and stress are deeply connected. When the body is neglected,
        stress becomes harder to manage.
      </p>
      <ul>
        <li>Regular physical activity</li>
        <li>Balanced nutrition</li>
        <li>Adequate sleep</li>
        <li>Staying hydrated</li>
      </ul>
      <p>
        Exercise, in particular, helps release built-up tension and improves mood by increasing endorphins.
      </p>

      <p><strong>5. Reframe Negative Thinking</strong></p>
      <p>
        Stress is often intensified by how we interpret situations. Catastrophic thinking,
        perfectionism, and constant self-criticism increase emotional strain.
      </p>
      <ul>
        <li>Ask yourself, “Is this within my control?”</li>
        <li>Challenge unrealistic expectations</li>
        <li>Replace harsh self-talk with compassionate language</li>
      </ul>
      <p>
        Changing perspective does not deny problems—it changes how powerfully they affect you.
      </p>

      <p><strong>6. Stay Connected and Seek Support</strong></p>
      <p>
        Human connection is one of the strongest buffers against stress. Sharing concerns
        with trusted people helps reduce emotional burden and creates a sense of belonging.
      </p>
      <ul>
        <li>Friends or family</li>
        <li>Support groups</li>
        <li>Counselors or therapists</li>
      </ul>
      <p>
        Seeking help is a sign of strength, not weakness.
      </p>

      <p><strong>7. Make Time for Rest and Enjoyment</strong></p>
      <p>
        Chronic stress often comes from a life filled only with responsibilities.
        Purposefully engaging in enjoyable activities restores emotional balance.
      </p>
      <ul>
        <li>Creative hobbies</li>
        <li>Nature walks</li>
        <li>Music or art</li>
        <li>Quiet time alone</li>
      </ul>
      <p>
        Rest is not wasted time—it is essential recovery.
      </p>

      <h4>When Stress Becomes Unmanageable</h4>
      <p>
        If stress begins to interfere with daily functioning, relationships, or mental health,
        professional support is important. Persistent stress may be linked to anxiety disorders,
        depression, or burnout and should not be ignored.
      </p>

      <h4>Conclusion</h4>
      <p>
        Stress is unavoidable, but suffering from it is not. By developing healthy coping
        strategies, setting boundaries, and caring for both mind and body, stress can become
        more manageable and less overwhelming.
      </p>
      <p>
        Stress management is a lifelong skill—one that strengthens resilience, improves
        well-being, and allows individuals to navigate life’s challenges with greater clarity
        and calm. Learning to manage stress is ultimately an investment in long-term health,
        emotional stability, and a more balanced life.
      </p>
    </>
  )
},

  {
  id: 4,
  title: "Digital Detox",
  img: digitalDetoxImg,
  content: (
    <>
      <h3>Digital Detox: Reclaiming Balance in a Hyperconnected World</h3>

      <p>
        Digital technology has transformed how we communicate, work, learn, and relax.
        Smartphones, social media, and constant online access offer convenience and connection,
        but they also blur the boundaries between rest and stimulation. For many people,
        continuous screen exposure has become a source of stress, distraction, and emotional fatigue.
        This is where the concept of a digital detox becomes increasingly important.
      </p>

      <p>
        A digital detox involves intentionally reducing or temporarily disconnecting from digital devices
        to restore focus, mental clarity, and emotional well-being. It is not about rejecting technology,
        but about using it more mindfully.
      </p>

      <h4>Why a Digital Detox Matters</h4>
      <p>
        Constant connectivity keeps the brain in a state of alert. Notifications, messages,
        and endless content streams compete for attention, often leaving little room for rest or reflection.
        Over time, this can lead to:
      </p>

      <ul>
        <li>Reduced attention span and difficulty concentrating</li>
        <li>Increased stress and mental overload</li>
        <li>Poor sleep quality due to excessive screen use</li>
        <li>Social comparison and decreased self-esteem</li>
        <li>Weakened real-life connections</li>
      </ul>

      <p>
        A digital detox helps interrupt this cycle and creates space for deeper presence,
        rest, and intentional living.
      </p>

      <h4>Understanding Digital Overload</h4>
      <p>
        Digital overload occurs when the brain is exposed to more information than it can effectively process.
        Social media algorithms, news feeds, and multitasking demand constant engagement,
        which can exhaust cognitive resources. The result is mental fatigue, irritability,
        and a sense of being constantly “switched on.”
      </p>

      <p>
        By stepping back from digital stimulation, the nervous system is allowed to reset and recover.
      </p>

      <h4>Core Principles of a Digital Detox</h4>

      <p><strong>1. Set Clear Intentions</strong></p>
      <p>
        A successful digital detox starts with understanding why you need it.
        Whether the goal is improved focus, better sleep, emotional balance,
        or more meaningful connections, clarity helps guide boundaries.
      </p>
      <p>
        <em>Tip:</em> Define what a digital detox means for you—this could be limiting social media,
        avoiding screens before bed, or taking full device-free days.
      </p>

      <p><strong>2. Create Healthy Digital Boundaries</strong></p>
      <p>
        Rather than complete disconnection, many people benefit from structured limits on device use.
      </p>
      <ul>
        <li>Turning off non-essential notifications</li>
        <li>Setting screen-free times (such as mornings or meals)</li>
        <li>Keeping phones out of the bedroom</li>
        <li>Limiting social media usage to specific times of day</li>
      </ul>
      <p>
        Boundaries help technology serve you, rather than control your attention.
      </p>

      <p><strong>3. Replace Screen Time with Meaningful Activities</strong></p>
      <p>
        Digital detox is most effective when screen time is replaced—not just removed.
        Engaging in offline activities restores balance and fulfillment.
      </p>
      <ul>
        <li>Reading physical books</li>
        <li>Journaling or creative writing</li>
        <li>Spending time in nature</li>
        <li>Exercising or practicing mindfulness</li>
        <li>Having uninterrupted conversations</li>
      </ul>

      <p><strong>4. Improve Sleep Through Reduced Screen Exposure</strong></p>
      <p>
        Excessive screen use, especially at night, interferes with the body’s natural sleep rhythm.
        Blue light suppresses melatonin and mental stimulation delays relaxation.
      </p>
      <p>
        A digital detox supports better sleep by encouraging device-free evenings
        and calmer pre-bed routines.
      </p>

      <p><strong>5. Be Mindful of Emotional Triggers</strong></p>
      <p>
        Social media can intensify stress through comparison, fear of missing out,
        and constant exposure to curated realities. Becoming aware of emotional responses
        to online content helps reduce its impact.
      </p>
      <ul>
        <li>Unfollow accounts that trigger anxiety or negativity</li>
        <li>Limit exposure to distressing news cycles</li>
        <li>Choose content that educates or inspires rather than overwhelms</li>
      </ul>

      <p><strong>6. Reconnect with the Present Moment</strong></p>
      <p>
        Digital detox allows for deeper awareness of thoughts, surroundings, and relationships.
        Without constant digital interruptions, attention naturally shifts to the present.
      </p>
      <p>
        Simple moments—listening fully, noticing emotions, or observing nature—become
        more accessible and meaningful.
      </p>

      <p><strong>7. Make Digital Detox a Habit, Not a One-Time Event</strong></p>
      <p>
        A single detox can be refreshing, but long-term change comes from consistent habits.
        Regularly scheduled breaks from technology support sustained mental clarity
        and emotional balance.
      </p>
      <ul>
        <li>Weekly screen-free hours</li>
        <li>Monthly social media breaks</li>
        <li>Daily tech-free routines</li>
      </ul>

      <h4>When Digital Detox Feels Difficult</h4>
      <p>
        Difficulty disconnecting may signal emotional reliance, habit loops,
        or fear of missing out. This is common and understandable.
        Gradual changes are often more sustainable than sudden, complete disconnection.
      </p>
      <p>
        If digital use is affecting mental health, productivity, or relationships,
        professional guidance may be helpful.
      </p>

      <h4>Conclusion</h4>
      <p>
        In a world that encourages constant connection, choosing to disconnect—intentionally
        and mindfully—is a powerful act of self-care. Digital detox is not about abandoning
        technology, but about restoring balance, protecting mental space,
        and reconnecting with what truly matters.
      </p>
      <p>
        By creating thoughtful boundaries and prioritizing presence,
        individuals can experience greater clarity, improved well-being,
        and a healthier relationship with the digital world.
      </p>
    </>
  )
},

{ 
  id: 5, 
  title: "Healthy Eating", 
  img: healthyEatingImg, 
  content: (
    <>
      <h3>Nourishing the Body and Mind</h3>
      <p>
        Healthy eating is not about strict diets or deprivation. It is about nourishing the body with the nutrients it needs to function, grow, and heal. Small, consistent food choices can greatly improve energy levels, mental clarity, and overall well-being.
      </p>

      <h4>Why Healthy Eating Matters</h4>
      <p>
        The food we eat fuels every system in the body. Balanced nutrition supports sustained energy, stronger immunity, improved concentration, and reduced risk of chronic illnesses such as heart disease and diabetes. Nutrition also plays a key role in mood regulation and emotional balance.
      </p>

      <h4>Understanding Balanced Nutrition</h4>
      <p>
        Healthy eating is built on balance, variety, and moderation. A well-rounded diet includes carbohydrates for energy, proteins for growth and repair, healthy fats for brain and heart health, and essential vitamins and minerals for overall function.
      </p>

      <ul>
        <li><strong>Carbohydrates:</strong> Whole grains, fruits, and vegetables provide steady energy.</li>
        <li><strong>Proteins:</strong> Beans, eggs, fish, and lean meats support muscle and tissue repair.</li>
        <li><strong>Healthy Fats:</strong> Nuts, seeds, avocados, and olive oil promote brain and heart health.</li>
      </ul>

      <h4>Core Healthy Eating Habits</h4>
      <ul>
        <li><strong>Eat a Variety of Foods:</strong> Different colors and food types provide diverse nutrients.</li>
        <li><strong>Choose Whole Foods:</strong> Minimize highly processed foods high in sugar and salt.</li>
        <li><strong>Practice Mindful Eating:</strong> Eat slowly and pay attention to hunger and fullness cues.</li>
        <li><strong>Stay Hydrated:</strong> Drinking enough water supports digestion and energy levels.</li>
        <li><strong>Allow Flexibility:</strong> Enjoy favorite foods in moderation for long-term balance.</li>
      </ul>

      <h4>Healthy Eating and Mental Well-Being</h4>
      <p>
        A nutrient-rich diet supports brain function, mood stability, and stress management. When the body is well-nourished, it is better equipped to handle emotional and physical challenges.
      </p>

      <p>
        Healthy eating is a lifelong practice focused on balance, enjoyment, and sustainability—not perfection.
      </p>
    </>
  )
},

 {
  id: 6,
  title: "Nature Therapy",
  img: natureTherapyImg,
  content: (
    <>
      <h3>Nature Therapy: Healing the Mind and Body Through the Outdoors</h3>

      <p>
        In today’s fast-paced, screen-centered world, many people feel disconnected from the natural world.
        Nature therapy, sometimes called ecotherapy, is the practice of using natural environments to improve
        mental, emotional, and physical well-being. It is based on the understanding that humans are inherently
        connected to nature and that spending time outdoors can be deeply restorative.
      </p>

      <p>
        Nature therapy is not just a leisure activity—it is a holistic approach to wellness that promotes relaxation,
        reduces stress, and strengthens resilience.
      </p>

      <h4>Why Nature Therapy Matters</h4>
      <p>
        Modern life often keeps us indoors, under artificial lights, and surrounded by constant noise and digital stimulation.
        This disconnection can contribute to:
      </p>
      <ul>
        <li>Increased stress and anxiety</li>
        <li>Mental fatigue and difficulty concentrating</li>
        <li>Feelings of isolation or depression</li>
        <li>Reduced physical activity and weakened immunity</li>
      </ul>
      <p>
        Engaging with nature restores a sense of balance, calm, and perspective. Even brief exposure to natural environments
        can have measurable benefits for mind and body.
      </p>

      <h4>How Nature Affects the Brain and Body</h4>
      <ul>
        <li>Lowered cortisol levels (stress hormone)</li>
        <li>Reduced blood pressure and heart rate</li>
        <li>Improved mood and decreased anxiety</li>
        <li>Enhanced attention and cognitive function</li>
        <li>Greater sense of connectedness and mindfulness</li>
      </ul>
      <p>
        These effects are amplified when the experience is immersive, quiet, and focused on mindful observation rather than passive presence.
      </p>

      <h4>Core Practices of Nature Therapy</h4>

      <p><strong>1. Forest Bathing (Shinrin-Yoku)</strong></p>
      <p>
        Mindfully walking through forests and focusing on sensory experiences such as sights, sounds, and smells can reduce stress,
        boost immunity, and improve mood.
      </p>
      <p><em>Tip:</em> Walk slowly, breathe deeply, and notice the textures of leaves, the sound of birds, and the patterns of light.</p>

      <p><strong>2. Mindful Outdoor Walks</strong></p>
      <p>
        Even urban parks or gardens provide restorative experiences. Nature walks encourage reflection, meditation, and presence.
      </p>
      <p><em>Tip:</em> Leave phones behind or silence notifications to fully engage with your surroundings.</p>

      <p><strong>3. Gardening and Horticultural Therapy</strong></p>
      <p>
        Planting and caring for plants fosters a sense of accomplishment and connection. Gardening can be meditative, reducing anxiety and promoting positivity.
      </p>
      <p><em>Tip:</em> Small-scale activities, such as growing herbs or indoor plants, offer similar benefits if outdoor space is limited.</p>

      <p><strong>4. Water-Based Activities</strong></p>
      <p>
        Rivers, lakes, and oceans have a calming effect. Walking along the shore, kayaking, or listening to water can soothe the mind.
      </p>

      <p><strong>5. Nature Journaling or Creative Expression</strong></p>
      <p>
        Sketching landscapes or writing reflections outdoors enhances mindfulness and deepens connection to the environment.
      </p>
      <p><em>Tip:</em> Note changes in light, weather, and seasons to cultivate awareness and appreciation.</p>

      <p><strong>6. Seasonal and Outdoor Retreats</strong></p>
      <p>
        Extended periods spent in natural settings—such as camping, hiking, or weekend retreats—can intensify restorative effects
        and foster long-term stress resilience.
      </p>

      <h4>The Mental and Emotional Benefits</h4>
      <p>
        Nature therapy supports emotional regulation, reduces rumination, and enhances creativity.
        Regular engagement can increase optimism, strengthen social bonds, and cultivate gratitude and a sense of purpose.
      </p>

      <h4>When Nature Therapy Is Most Effective</h4>
      <p>
        Benefits are amplified when practices are consistent, intentional, and mindful.
        Even short daily interactions—like sitting under a tree, walking in a park, or caring for houseplants—can improve mood and focus.
      </p>
      <p>
        For individuals with limited mobility or urban constraints, virtual nature experiences or indoor plant care can provide partial benefits.
      </p>

      <h4>Conclusion</h4>
      <p>
        Nature therapy reminds us that humans are part of the living world and that well-being is deeply connected to the natural environment.
        By intentionally spending time outdoors, observing, and engaging with nature, we can reduce stress, enhance mental clarity, and foster emotional balance.
      </p>
      <p>
        Engaging with the natural world is more than relaxation; it is an investment in long-term mental, emotional, and physical well-being.
      </p>
    </>
  )
},

 {
  id: 7,
  title: "Social Connection",
  img: socialConnectionImg,
  content: (
    <>
      <h3>Social Connection: The Key to Emotional and Physical Well-Being</h3>

      <p>
        Humans are inherently social beings. Our relationships and interactions shape our emotions, behavior, and even physical health.
        In an era of digital communication and busy lifestyles, meaningful social connection can sometimes be overlooked, yet it is one
        of the most powerful predictors of well-being.
      </p>

      <p>
        Social connection goes beyond simply being around people—it involves feeling understood, supported, and engaged in mutually meaningful relationships.
        Building and nurturing these connections strengthens resilience, reduces stress, and enhances overall quality of life.
      </p>

      <h4>Why Social Connection Matters</h4>
      <p>
        Strong social bonds provide emotional support, reduce feelings of isolation, and foster a sense of belonging.
        Research consistently shows that individuals with rich social networks tend to:
      </p>
      <ul>
        <li>Experience lower stress and anxiety levels</li>
        <li>Recover more quickly from illness</li>
        <li>Maintain better cognitive function as they age</li>
        <li>Live longer and healthier lives</li>
        <li>Feel greater life satisfaction and happiness</li>
      </ul>
      <p>
        Conversely, social isolation and loneliness are linked to negative mental and physical health outcomes, including depression,
        cardiovascular problems, and weakened immunity.
      </p>

      <h4>Understanding the Nature of Connection</h4>
      <p>
        Social connection is multidimensional. It includes:
      </p>
      <ul>
        <li><strong>Emotional support:</strong> Feeling cared for and understood</li>
        <li><strong>Practical support:</strong> Receiving tangible help when needed</li>
        <li><strong>Shared experiences:</strong> Engaging in meaningful activities together</li>
        <li><strong>Sense of belonging:</strong> Feeling part of a community or group</li>
      </ul>
      <p>
        Healthy social connections are reciprocal, fostering both giving and receiving support.
      </p>

      <h4>Core Strategies to Foster Social Connection</h4>

      <p><strong>1. Prioritize Quality Over Quantity</strong></p>
      <p>
        It is better to cultivate a few deep, meaningful relationships than to focus on a large number of superficial connections.
        Quality interactions build trust, empathy, and emotional safety.
      </p>
      <p><em>Tip:</em> Nurture relationships where you feel valued and heard, and offer the same in return.</p>

      <p><strong>2. Practice Active Listening and Empathy</strong></p>
      <p>
        Being fully present in conversations and genuinely listening fosters intimacy and trust. Empathy—understanding others’ perspectives without judgment—strengthens bonds.
      </p>
      <ul>
        <li>Maintain eye contact</li>
        <li>Ask open-ended questions</li>
        <li>Reflect back feelings and validate experiences</li>
      </ul>

      <p><strong>3. Engage in Shared Activities</strong></p>
      <p>
        Participating in activities with others—sports, hobbies, volunteering, or creative projects—creates shared experiences that deepen connection.
      </p>

      <p><strong>4. Communicate Regularly</strong></p>
      <p>
        Small gestures like sending a text, making a phone call, or checking in can sustain relationships over time, especially when distance or busy schedules are involved.
      </p>

      <p><strong>5. Join Communities and Social Groups</strong></p>
      <p>
        Community involvement fosters belonging. Local clubs, online groups, spiritual communities, or hobby circles provide support and opportunities to connect with like-minded individuals.
      </p>

      <p><strong>6. Set Healthy Boundaries</strong></p>
      <p>
        Respect for personal space and emotional needs ensures connections are sustainable and mutually beneficial, preventing burnout or resentment.
      </p>

      <p><strong>7. Support Others</strong></p>
      <p>
        Helping, encouraging, and celebrating others strengthens bonds and increases feelings of purpose and fulfillment.
      </p>

      <h4>Social Connection and Mental Health</h4>
      <p>
        Socially connected individuals are generally more resilient to stress, anxiety, and depression.
        Conversations, shared laughter, and mutual support release oxytocin, the “bonding hormone,” which reduces stress and fosters emotional well-being.
      </p>

      <h4>When Social Connection Feels Challenging</h4>
      <p>
        Building and maintaining meaningful relationships can be difficult due to social anxiety, past experiences, or lifestyle constraints.
        Start with small, intentional steps: reach out to someone you trust, join interest-based groups, or volunteer. Even brief but genuine interactions can positively impact well-being.
      </p>

      <h4>Conclusion</h4>
      <p>
        Social connection is a fundamental human need that touches every aspect of life—from emotional resilience to physical health.
        Investing in meaningful relationships, nurturing bonds, and engaging with communities creates a sense of belonging, purpose, and joy.
      </p>
      <p>
        By fostering genuine relationships, we not only support our own well-being but also contribute to the health and happiness of those around us.
      </p>
    </>
  )
},

{
  id: 8,
  title: "Morning Routines",
  img: morningRoutineImg,
  content: (
    <>
      <h3>Morning Routines: Starting the Day with Energy and Intention</h3>

      <p>
        How you begin your day sets the tone for the hours ahead. A thoughtfully designed morning routine can boost energy,
        enhance focus, and promote emotional balance. While mornings are often rushed or stressful, intentionally structuring
        the first moments of the day can transform productivity, mindset, and overall well-being.
      </p>

      <p>
        Morning routines are not about perfection or rigid schedules—they are about creating habits that support your body,
        mind, and priorities from the very start of the day.
      </p>

      <h4>Why Morning Routines Matter</h4>
      <p>
        The first hour after waking is a powerful opportunity to influence mood, clarity, and energy. People with consistent
        morning routines often experience:
      </p>
      <ul>
        <li>Greater focus and productivity throughout the day</li>
        <li>Reduced stress and decision fatigue</li>
        <li>Improved emotional regulation and resilience</li>
        <li>More consistent healthy habits, like exercise and mindful eating</li>
        <li>Enhanced sense of control and life satisfaction</li>
      </ul>
      <p>
        A strong morning routine sets up the day for intentional living rather than reactive living.
      </p>

      <h4>Core Principles of an Effective Morning Routine</h4>

      <p><strong>1. Wake Up Consistently</strong></p>
      <p>
        Maintaining a consistent wake-up time regulates your circadian rhythm, making it easier to feel alert in the morning
        and sleep well at night.
      </p>
      <p><em>Tip:</em> Gradually adjust your schedule if needed, and aim to wake up at the same time daily—even on weekends.</p>

      <p><strong>2. Hydrate Immediately</strong></p>
      <p>
        After hours of sleep, the body is naturally dehydrated. Drinking water upon waking supports digestion, circulation, and cognitive function.
      </p>
      <p><em>Tip:</em> Keep a glass of water by your bedside and drink it before reaching for coffee or breakfast.</p>

      <p><strong>3. Move Your Body</strong></p>
      <p>
        Morning movement—stretching, yoga, a short walk, or light exercise—stimulates circulation, improves alertness, and reduces tension.
        Physical activity also boosts mood by releasing endorphins.
      </p>
      <p><em>Tip:</em> Even 5–10 minutes of movement can make a significant difference.</p>

      <p><strong>4. Practice Mindfulness or Reflection</strong></p>
      <p>
        Spending a few minutes in meditation, deep breathing, or journaling fosters mental clarity and emotional balance.
        Reflection helps set intentions, focus on priorities, and cultivate gratitude.
      </p>
      <ul>
        <li>Write down three things you are grateful for</li>
        <li>Set one or two key intentions for the day</li>
        <li>Practice deep breathing or a short meditation session</li>
      </ul>

      <p><strong>5. Eat a Nourishing Breakfast</strong></p>
      <p>
        A healthy breakfast fuels the body and brain for the morning ahead. Include protein, complex carbohydrates,
        healthy fats, and fruits or vegetables to sustain energy and focus.
      </p>
      <p><em>Tip:</em> Prepare simple, balanced options like oatmeal with nuts, eggs with vegetables, or a smoothie with fruits and protein.</p>

      <p><strong>6. Limit Early Distractions</strong></p>
      <p>
        Avoid immediately checking emails, social media, or news. Starting the day in a reactive state can increase stress and reduce focus.
      </p>
      <p><em>Tip:</em> Create a device-free period in the first 30–60 minutes of your morning to center your mind.</p>

      <p><strong>7. Plan the Day Ahead</strong></p>
      <p>
        Take a few minutes to review priorities and schedule. Planning reduces decision fatigue and helps maintain control over time and energy.
      </p>
      <p><em>Tip:</em> Identify the top 2–3 tasks that matter most, rather than trying to do everything at once.</p>

      <h4>Mental and Emotional Benefits</h4>
      <p>
        A consistent morning routine cultivates a sense of stability and self-efficacy. It strengthens habits, encourages mindfulness,
        and reduces the stress of chaotic mornings. Over time, these small intentional acts can profoundly impact resilience, focus, and overall life satisfaction.
      </p>

      <h4>When Mornings Feel Challenging</h4>
      <p>
        Not everyone is a “morning person,” and energy patterns vary. If mornings feel difficult:
      </p>
      <ul>
        <li>Start gradually, adding one positive habit at a time</li>
        <li>Adjust wake-up times to align with your natural rhythm</li>
        <li>Focus on small, enjoyable rituals rather than strict schedules</li>
      </ul>
      <p>
        Even minor adjustments—like drinking water, stretching, or journaling—can improve mornings significantly.
      </p>

      <h4>Conclusion</h4>
      <p>
        Morning routines are more than a series of tasks—they are a way to start the day with intention, energy, and calm.
        By prioritizing movement, mindfulness, nourishment, and focus, mornings become a launchpad for productivity, emotional balance, and overall well-being.
      </p>
      <p>
        Building a morning routine is a personal journey, and even small, consistent actions can create lasting benefits, helping you face each day with clarity, confidence, and purpose.
      </p>
    </>
  )
}

];
const exercises = [
  { id: 1, title: "4-7-8 Breathing", img: breathingImg, desc: "Inhale 4s, Hold 7s, Exhale 8s." },
  { id: 2, title: "Box Breathing", img: boxBreathingImg, desc: "Inhale, hold, exhale, hold - 4s each." },
  { id: 3, title: "Neck Rolls", img: neckRollsImg, desc: "Gently roll your neck to release tension." },
  { id: 4, title: "Gratitude Prompt", img: gratitudeImg, desc: "Note three things you're thankful for." },
  { id: 5, title: "Eye Palming", img: eyePalmingImg, desc: "Cover eyes with palms to rest optic nerves." },
  { id: 6, title: "Grounding 5-4-3", img: groundingImg, desc: "Identify 5 things you see, 4 you feel..." }
];

const resources = [
  { title: "Headspace", desc: "Meditation and sleep made simple.", url: "https://www.headspace.com" },
  { title: "Calm", desc: "Sleep, meditation and relaxation app.", url: "https://www.calm.com" },
  { title: "Sleep Foundation", desc: "Everything you need for better sleep.", url: "https://www.sleepfoundation.org" },
  { title: "WHO Wellness", desc: "Global health and wellbeing standards.", url: "https://www.who.int" }
];

const WellnessTips = () => {
  // 1. Initialize state from LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('wellness_favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);

  // 2. Save to LocalStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('wellness_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const sortedArticles = useMemo(() => {
    return [...initialArticles].sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      return bFav - aFav; // Favorites move to the top
    });
  }, [favorites]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // ... rest of your return statement

  return (
    <div className="wellness-page">
      <h1 className="main-title">Wellness Hub</h1>

      {/* ARTICLES SECTION */}
      <section>
        <h2 className="section-title">📖 Daily Reads</h2>
        <div className="article-grid">
          {sortedArticles.map((art) => (
            <div key={art.id} className="article-card">
              <div className="card-image" style={{ backgroundImage: `url(${art.img})` }}>
                <button
                  className={`fav-btn ${favorites.includes(art.id) ? "active" : ""}`}
                  onClick={(e) => toggleFavorite(art.id, e)}
                >
                  {favorites.includes(art.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="card-body">
                <h3>{art.title}</h3>
                <button className="read-btn" onClick={() => setSelectedArticle(art)}>Read Article</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXERCISES SECTION */}
      <section>
        <h2 className="section-title">🧘 Quick Exercises</h2>
        <div className="exercise-grid">
          {exercises.map((ex) => (
            <div key={ex.id} className="exercise-box">
              <div className="exercise-anim">
                <img src={ex.img} alt={ex.title} className="exercise-img" />
              </div>
              <p>{ex.desc}</p>
              <button className="try-btn" onClick={() => setActiveExercise(ex)}>Try Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* EXTERNAL LINKS SECTION */}
      <section>
        <h2 className="section-title">🔗 External Resources</h2>
        <div className="resource-flex">
          {resources.map((res, i) => (
            <a key={i} href={res.url} target="_blank" rel="noreferrer" className="res-card">
              <h4>{res.title}</h4>
              <p>{res.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* FULL SCREEN MODAL FOR EXERCISES */}
      {activeExercise && (
        <div className="modal-overlay" onClick={() => setActiveExercise(null)}>
          <div className="modal-content fullscreen" onClick={e => e.stopPropagation()}>
            <img src={activeExercise.img} alt={activeExercise.title} className="giant-img" />
            <h2>{activeExercise.title}</h2>
            <p>{activeExercise.desc}</p>
            <button className="close-btn" onClick={() => setActiveExercise(null)}>Exit Exercise</button>
          </div>
        </div>
      )}

     {/* ARTICLE MODAL - UPDATED FOR BETTER IMAGES */}
{selectedArticle && (
  <div className="modal-overlay article-overlay" onClick={() => setSelectedArticle(null)}>
    <div className="modal-content fullscreen" onClick={e => e.stopPropagation()}>
      
      {/* High-quality Image at the top */}
      <div className="article-image-container">
        <img 
          src={selectedArticle.img} 
          alt={selectedArticle.title} 
          className="article-fullscreen-img" 
        />
      </div>

      <div className="article-body-wrapper">
        <h2 className="article-modal-title">{selectedArticle.title}</h2>
        <div className="article-full-content">
          {selectedArticle.content}
        </div>
        <button className="close-btn" onClick={() => setSelectedArticle(null)}>
          Back to Articles
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default WellnessTips;