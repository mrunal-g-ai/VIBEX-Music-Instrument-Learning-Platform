/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lesson 1.4 — How to Hold the Guitar
 * Seated posture, body balance, neck angle, shoulder relaxation, and the hands-free test.
 */

import { LessonPlayerConfig } from '../components/lessons/LessonPlayerEngine';

export const LESSON_1_4_CONFIG: LessonPlayerConfig = {
  lessonId: 'lesson_1_4',
  lessonNumber: '1.4',
  title: 'How to Hold the Guitar',
  subtitle: 'Sitting posture, waist balance on thigh, relaxed shoulders, neck elevated.',
  stages: [
    // =====================================================================
    // STAGE 1: INTRO
    // =====================================================================
    {
      id: 'l14_intro',
      type: 'intro',
      label: 'Intro',
      title: 'Posture Is Your Secret Superpower',
      vibeDialogue:
        'Good posture is the single most important physical habit you will build as a guitarist. Bad posture causes back pain, wrist injuries, and limits your speed. Let us set up your body correctly from day one.',
      subtitle: 'Learn the ergonomic sitting position that professionals use for hours without fatigue.',
    },

    // =====================================================================
    // STAGE 2: DEMONSTRATE — Step-by-Step Posture Setup
    // =====================================================================
    {
      id: 'l14_setup',
      type: 'demonstrate',
      label: 'Setup',
      title: 'Step-by-Step Posture Setup',
      vibeDialogue:
        'Follow these steps exactly. Each one matters. Start by sitting on a sturdy, armless chair.',
      demonstrationSteps: [
        {
          instruction: 'Sit on the front half of your chair',
          detail: 'Do not lean back into the chair. Sit near the edge with your back straight and tall. Both feet flat on the floor, shoulder width apart.',
          icon: '🪑',
        },
        {
          instruction: 'Rest the guitar waist on your RIGHT thigh',
          detail: 'The curved waist of the guitar body sits naturally on your right thigh (for right-handed players). The guitar should feel balanced without needing your hands.',
          icon: '🦵',
        },
        {
          instruction: 'Tilt the neck upward at 30-40 degrees',
          detail: 'The headstock should point upward toward your shoulder height, NOT toward the floor. This keeps your left wrist in a neutral, healthy position.',
          icon: '📐',
        },
        {
          instruction: 'Drape your right forearm over the upper body',
          detail: 'Your right forearm rests naturally over the top edge of the guitar body. This acts as a counter-balance and positions your picking hand near the soundhole.',
          icon: '💪',
        },
        {
          instruction: 'Relax your shoulders completely',
          detail: 'Drop both shoulders down and back. No hunching, no tension. Imagine a string pulling the top of your head gently toward the ceiling.',
          icon: '🧘',
        },
      ],
    },

    // =====================================================================
    // STAGE 3: TEACH — Common Posture Mistakes
    // =====================================================================
    {
      id: 'l14_mistakes',
      type: 'teach',
      label: 'Mistakes',
      title: 'The 5 Most Common Posture Mistakes',
      vibeDialogue:
        'These mistakes are extremely common among beginners and can cause pain within weeks. Let us avoid them entirely.',
      teachPoints: [
        {
          icon: '❌',
          text: 'Hunching forward to look at the fretboard. This compresses your spine, tires your neck, and prevents your arms from moving freely.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Letting the neck point toward the floor. This forces your left wrist into an extreme, painful angle that causes tendonitis.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Squeezing the neck with your left hand to hold the guitar up. Your hand should be free to move. The lap and body support the guitar.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Sitting too far back in the chair. This makes you slouch and limits your arm reach.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Tensing your shoulders up toward your ears. This creates upper body strain within minutes.',
          color: '#FB7185',
        },
      ],
      teachTip:
        'Self-check every 5 minutes during practice: "Are my shoulders relaxed? Is my neck elevated? Am I breathing calmly?"',
    },

    // =====================================================================
    // STAGE 4: TEACH — Classical vs. Casual Position
    // =====================================================================
    {
      id: 'l14_positions',
      type: 'teach',
      label: 'Positions',
      title: 'Classical vs. Casual Sitting Position',
      vibeDialogue:
        'There are two primary sitting positions. Both are correct — they serve different musical styles.',
      teachPoints: [
        {
          icon: '🎸',
          text: 'Casual Position: Guitar waist rests on the RIGHT thigh. The guitar sits lower and more relaxed. Used by most rock, pop, folk, and blues guitarists.',
          color: '#54D6C3',
        },
        {
          icon: '🎶',
          text: 'Classical Position: Guitar waist rests on the LEFT thigh (for right-handed players), with a footstool raising the left foot. The guitar sits higher, closer to the body center. Used by classical and flamenco players.',
          color: '#8067FF',
        },
        {
          icon: '💡',
          text: 'Which to choose? As a beginner, the casual position is recommended. It feels more natural and works for 90% of guitar styles.',
          color: '#FBBF24',
        },
      ],
    },

    // =====================================================================
    // STAGE 5: PRACTICE — The Hands-Free Balance Test
    // =====================================================================
    {
      id: 'l14_balance',
      type: 'practice',
      label: 'Balance Test',
      title: 'The Hands-Free Balance Test',
      vibeDialogue:
        'This is the ultimate posture check. Place your guitar in playing position on your lap. Now take BOTH hands completely off the guitar. Can it sit stable for 20 seconds without falling? If yes, your balance is perfect.',
      practiceInstruction:
        'Place the guitar on your lap in playing position. Remove both hands. The guitar should sit balanced without tipping. Hold this for 20 seconds.',
      practiceTimer: 20,
    },

    // =====================================================================
    // STAGE 6: INTERACTIVE — Shoulder Check
    // =====================================================================
    {
      id: 'l14_shoulder',
      type: 'interactive',
      label: 'Shoulder Check',
      title: 'Shoulder Relaxation Drill',
      vibeDialogue:
        'Let us check your shoulder tension. Raise both shoulders up to your ears, hold for 3 seconds, then drop them completely. Repeat this 3 times. Feel the difference!',
      interactionPrompt:
        'Raise shoulders to ears, hold 3 seconds, then drop them completely. This releases built-up tension. Do it 3 times.',
      interactionType: 'hold_position',
      targetCount: 3,
    },

    // =====================================================================
    // STAGE 7: PRACTICE — Breathing Posture Hold
    // =====================================================================
    {
      id: 'l14_breathing',
      type: 'practice',
      label: 'Breathing',
      title: 'Posture + Breathing Hold',
      vibeDialogue:
        'Now hold your perfect posture for 30 seconds while breathing deeply and calmly. Back straight, shoulders relaxed, neck elevated, feet flat. This is how you should feel at the start of every practice session.',
      practiceInstruction:
        'Hold your perfect seated guitar posture. Breathe deeply in through your nose and out through your mouth. Keep shoulders dropped. 30 seconds.',
      practiceTimer: 30,
    },

    // =====================================================================
    // STAGE 8: QUIZ — Posture Mastery
    // =====================================================================
    {
      id: 'l14_quiz',
      type: 'quiz',
      label: 'Quiz',
      title: 'Posture Mastery Quiz',
      vibeDialogue:
        'Final test! Answer these questions to prove you understand proper guitar posture.',
      quizQuestions: [
        {
          question: 'Where should you sit on your chair when playing guitar?',
          options: [
            'Leaned all the way back into the chair',
            'On the front half of the chair with back straight',
            'Standing up with a strap',
            'Cross-legged on the floor',
          ],
          correctIdx: 1,
          explanation: 'Sitting on the front half keeps your back straight, prevents slouching, and gives your arms full range of motion.',
        },
        {
          question: 'At what angle should the guitar neck tilt?',
          options: [
            'Pointing straight down toward the floor',
            'Horizontal, parallel to the floor',
            'Upward at 30-40 degrees toward shoulder height',
            'Straight up at 90 degrees, vertical',
          ],
          correctIdx: 2,
          explanation: 'A 30-40 degree upward tilt keeps the left wrist in a neutral, ergonomic position.',
        },
        {
          question: 'Should your fretting hand support the weight of the guitar?',
          options: [
            'Yes, grip the neck tightly to hold the guitar up',
            'No — the lap and body support the guitar; the fretting hand stays light and free',
          ],
          correctIdx: 1,
          explanation: 'Your thigh and forearm balance the guitar. The left hand must remain light and agile for clean fretting.',
        },
        {
          question: 'In casual position, which thigh does the guitar body rest on?',
          options: [
            'Left thigh (for right-handed players)',
            'Right thigh (for right-handed players)',
            'Either thigh',
            'No thigh — you hold it in the air',
          ],
          correctIdx: 1,
          explanation: 'In casual (standard) position, the guitar waist rests on the right thigh for right-handed players.',
        },
      ],
    },

    // =====================================================================
    // STAGE 9: VICTORY
    // =====================================================================
    {
      id: 'l14_complete',
      type: 'complete',
      label: 'Complete',
      title: 'Posture Mastered!',
      vibeDialogue:
        'Your body is now set up for injury-free, comfortable guitar playing! Proper posture means you can practice for hours without pain. Next: left-hand finger positioning.',
      completionSummary: [
        'Sit on front half of chair, back straight, feet flat',
        'Guitar waist balanced on right thigh (casual position)',
        'Neck tilted upward at 30-40 degrees',
        'Right forearm draped over the upper body as counter-balance',
        'Shoulders relaxed, no tension, breathing calm',
        'Hands-free balance test: guitar stays stable without hands',
      ],
      badgeTitle: 'Perfect Posture',
      badgeDescription: 'Badge Unlocked',
      xpReward: 100,
    },
  ],
};
