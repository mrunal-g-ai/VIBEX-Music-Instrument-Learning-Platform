/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lesson 1.6 — Left-Hand Position
 * Thumb position, curved knuckle arch, fingertip contact, and relaxed wrist.
 */

import { LessonPlayerConfig } from '../components/lessons/LessonPlayerEngine';

export const LESSON_1_6_CONFIG: LessonPlayerConfig = {
  lessonId: 'lesson_1_6',
  lessonNumber: '1.6',
  title: 'Left-Hand Position',
  subtitle: 'Thumb behind neck, curved knuckle arch, fingertip contact, relaxed wrist.',
  stages: [
    // =====================================================================
    // STAGE 1: INTRO
    // =====================================================================
    {
      id: 'l16_intro',
      type: 'intro',
      label: 'Intro',
      title: 'The Classical Claw',
      vibeDialogue:
        'Your left hand is your melody hand, your chord hand, your musical voice. How you position it determines whether notes ring cleanly or buzz and mute. Let us build the perfect hand frame.',
      subtitle: 'Every chord, scale, and riff you will ever play depends on this foundation.',
    },

    // =====================================================================
    // STAGE 2: TEACH — Finger Numbering
    // =====================================================================
    {
      id: 'l16_fingers',
      type: 'teach',
      label: 'Finger Numbers',
      title: 'Left-Hand Finger Numbering',
      vibeDialogue:
        'In guitar notation, your left hand fingers are numbered 1 through 4. The thumb is labeled T. Every chord diagram, lesson, and tab you read will use these numbers.',
      teachPoints: [
        {
          icon: '1️⃣',
          text: 'Finger 1 = Index finger. The most used finger. It often bars across strings for barre chords.',
          color: '#8067FF',
        },
        {
          icon: '2️⃣',
          text: 'Finger 2 = Middle finger. Provides reach and strength for chord shapes.',
          color: '#54D6C3',
        },
        {
          icon: '3️⃣',
          text: 'Finger 3 = Ring finger. The weakest and least independent finger — needs extra training.',
          color: '#FF8066',
        },
        {
          icon: '4️⃣',
          text: 'Finger 4 = Pinky (little finger). Often neglected by beginners but essential for advanced playing.',
          color: '#FBBF24',
        },
        {
          icon: '👍',
          text: 'Thumb (T) = Rests behind the neck, providing counter-pressure. In some styles, it wraps over the top to fret bass notes.',
          color: '#FF5C93',
        },
      ],
    },

    // =====================================================================
    // STAGE 3: DEMONSTRATE — Perfect Hand Frame
    // =====================================================================
    {
      id: 'l16_frame',
      type: 'demonstrate',
      label: 'Hand Frame',
      title: 'Building the Perfect Hand Frame',
      vibeDialogue:
        'Follow these steps to build the biomechanically correct left-hand position. Imagine holding a fresh green tennis ball in your left hand — that relaxed, rounded arch is exactly what we need.',
      demonstrationSteps: [
        {
          instruction: 'Place your thumb pad on the center back of the neck',
          detail: 'The pad (fleshy part) of your thumb touches the wooden back of the neck, roughly opposite where frets 1-2 are on the front. Not the tip of the thumb — the pad.',
          icon: '👍',
        },
        {
          instruction: 'Curve all four fingers into an arch',
          detail: 'Both the base knuckle and the tip knuckle of each finger should be bent, creating a dome shape. Your hand should look like you are holding an invisible tennis ball.',
          icon: '🏐',
        },
        {
          instruction: 'Contact strings only with fingertips',
          detail: 'Only the very tips of your fingers should touch the strings. If the flat pad of your finger touches, it will accidentally mute adjacent strings.',
          icon: '☝️',
        },
        {
          instruction: 'Keep your wrist straight and relaxed',
          detail: 'Do not collapse your wrist against the underside of the neck. Keep it naturally straight, as if reaching out for a handshake.',
          icon: '🤝',
        },
        {
          instruction: 'Position fingers behind (not on) the fret wire',
          detail: 'Press your fingertip just behind the metal fret wire, not directly on top of it. This produces the cleanest tone with the least pressure required.',
          icon: '🎯',
        },
      ],
    },

    // =====================================================================
    // STAGE 4: TEACH — Why Curved Knuckles Matter
    // =====================================================================
    {
      id: 'l16_why',
      type: 'teach',
      label: 'Why It Matters',
      title: 'Why Curved Knuckles Matter',
      vibeDialogue:
        'Flat fingers are the number one cause of muted strings and buzzing sounds. Let us understand exactly why curved knuckles are essential.',
      teachPoints: [
        {
          icon: '✅',
          text: 'Curved fingertip: Only touches one string. Adjacent strings ring freely and clearly. You hear sparkling, clean chord tones.',
          color: '#45D483',
        },
        {
          icon: '❌',
          text: 'Flat finger pad: Touches the target string AND accidentally leans against the next string, choking its vibration. You hear dead, muted thuds.',
          color: '#FB7185',
        },
        {
          icon: '💪',
          text: 'Less pressure needed: When you press with the very tip close to the fret wire, you need significantly less finger force. This reduces fatigue by 40-50%.',
          color: '#54D6C3',
        },
        {
          icon: '🏃',
          text: 'Better mobility: Curved fingers can move faster between frets. Flat fingers get "stuck" and slow down chord changes.',
          color: '#8067FF',
        },
      ],
      teachTip:
        'Test: Fret string 2 (B) with finger 1 on fret 1. Now pluck string 1 (high E). If string 1 rings cleanly, your knuckle arch is correct. If it sounds dead, flatten your finger to see the difference.',
    },

    // =====================================================================
    // STAGE 5: INTERACTIVE — Thumb Position Check
    // =====================================================================
    {
      id: 'l16_thumb',
      type: 'interactive',
      label: 'Thumb Check',
      title: 'Check Your Thumb Position',
      vibeDialogue:
        'Place your left hand on the guitar neck. Look at the back of the neck: your thumb pad should be behind frets 1-2, centered vertically on the neck. Not poking over the top! Tap "I Did It" when positioned correctly.',
      interactionPrompt:
        'Position your thumb pad on the center back of the neck behind fret 2. Verify it is centered (not too high or too low). Do this 3 times with increasing awareness.',
      interactionType: 'hold_position',
      targetCount: 3,
    },

    // =====================================================================
    // STAGE 6: PRACTICE — The Clean Ring Test
    // =====================================================================
    {
      id: 'l16_ring_test',
      type: 'practice',
      label: 'Ring Test',
      title: 'The Clean String Ring Test',
      vibeDialogue:
        'This is the ultimate left-hand position test. Place finger 1 on fret 1 of string 2 (B string). Now pluck string 1 (high E). It must ring completely clear and sustained. If it buzzes or sounds dead, adjust your knuckle arch until it rings. Practice for 20 seconds.',
      practiceInstruction:
        'Fret string 2 at fret 1 with finger 1. Pluck string 1 open. It should ring clearly. If not, curve your knuckle more. Practice until the tone is crystal clear.',
      practiceTimer: 20,
    },

    // =====================================================================
    // STAGE 7: TEACH — Common Left-Hand Mistakes
    // =====================================================================
    {
      id: 'l16_mistakes',
      type: 'teach',
      label: 'Avoid These',
      title: 'Common Left-Hand Mistakes',
      vibeDialogue:
        'These mistakes are incredibly common. Memorize them so you can self-correct during practice.',
      teachPoints: [
        {
          icon: '❌',
          text: 'Wrapping the thumb completely over the top of the neck. This limits finger reach and forces a collapsed wrist angle.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Collapsing the first finger knuckle flat, muting the adjacent string. Always maintain the arch.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Squeezing with excessive brute force. If your fingertips turn white, you are pressing way too hard. Less pressure near the fret wire = clean tone.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Pressing ON TOP of the fret wire instead of behind it. This creates metallic buzzing. Always press just behind the fret.',
          color: '#FB7185',
        },
        {
          icon: '❌',
          text: 'Letting the wrist collapse against the neck bottom. Keep the wrist straight as if reaching for a handshake.',
          color: '#FB7185',
        },
      ],
      teachTip:
        'Self-check mantra: "Thumb centered, knuckles curved, tips only, minimal pressure, behind the fret."',
    },

    // =====================================================================
    // STAGE 8: PRACTICE — Four-Finger Arch Drill
    // =====================================================================
    {
      id: 'l16_drill',
      type: 'practice',
      label: 'Arch Drill',
      title: 'Four-Finger Arch Placement',
      vibeDialogue:
        'Place all four fingers on string 3 (G string): finger 1 on fret 1, finger 2 on fret 2, finger 3 on fret 3, finger 4 on fret 4. Keep all knuckles curved. Hold this shape for 30 seconds while keeping neighboring strings untouched.',
      practiceInstruction:
        'Place fingers 1-2-3-4 on frets 1-2-3-4 of string 3 (G). Maintain curved knuckles on all four fingers. Pluck strings 2 and 4 — they should ring completely clear. Hold for 30 seconds.',
      practiceTimer: 30,
    },

    // =====================================================================
    // STAGE 9: MATCH GAME — Finger Number Identification
    // =====================================================================
    {
      id: 'l16_match',
      type: 'match_game',
      label: 'Match',
      title: 'Finger Number Challenge',
      vibeDialogue:
        'Quick test! Match each finger description to its correct number.',
      matchItems: [
        {
          prompt: 'The index finger — the most-used fretting finger.',
          correctAnswer: 'Finger 1',
          options: ['Finger 1', 'Finger 2', 'Finger 3', 'Finger 4'],
          explanation: 'Finger 1 is the index finger. It handles barre chords and is the most active fretting finger.',
        },
        {
          prompt: 'The pinky / little finger — often neglected by beginners.',
          correctAnswer: 'Finger 4',
          options: ['Finger 2', 'Finger 3', 'Finger 4', 'Thumb'],
          explanation: 'Finger 4 (pinky) is essential for extended chord shapes and lead guitar techniques.',
        },
        {
          prompt: 'The ring finger — weakest and least independent, needs extra training.',
          correctAnswer: 'Finger 3',
          options: ['Finger 1', 'Finger 4', 'Finger 3', 'Finger 2'],
          explanation: 'Finger 3 (ring finger) shares tendons with the pinky, making independent movement harder.',
        },
      ],
    },

    // =====================================================================
    // STAGE 10: QUIZ — Left-Hand Position Mastery
    // =====================================================================
    {
      id: 'l16_quiz',
      type: 'quiz',
      label: 'Quiz',
      title: 'Left-Hand Mastery Quiz',
      vibeDialogue:
        'Final test! Prove you understand the biomechanics of a perfect left-hand position.',
      quizQuestions: [
        {
          question: 'Where should your thumb rest when fretting?',
          options: [
            'Wrapped over the top of the neck',
            'On the center back of the neck (pad against wood)',
            'Underneath the neck',
            'Pointing away from the guitar',
          ],
          correctIdx: 1,
          explanation: 'The thumb pad rests on the center back of the neck, providing counter-pressure to your fingertips.',
        },
        {
          question: 'What part of your finger should contact the string?',
          options: [
            'The flat finger pad',
            'The side of the finger',
            'The very tip of the finger',
            'The nail',
          ],
          correctIdx: 2,
          explanation: 'Only the fingertip should contact the string. This prevents accidentally muting adjacent strings.',
        },
        {
          question: 'Where exactly should you press relative to the fret wire?',
          options: [
            'Directly on top of the fret wire',
            'In the exact middle between two frets',
            'Just behind (toward the headstock side of) the fret wire',
            'As far from the fret wire as possible',
          ],
          correctIdx: 2,
          explanation: 'Pressing just behind the fret wire gives the cleanest tone with the least pressure needed.',
        },
        {
          question: 'In guitar finger notation, which number is the ring finger?',
          options: ['Finger 1', 'Finger 2', 'Finger 3', 'Finger 4'],
          correctIdx: 2,
          explanation: '1=Index, 2=Middle, 3=Ring, 4=Pinky. The thumb is labeled T.',
        },
        {
          question: 'What happens if your first finger knuckle collapses flat?',
          options: [
            'Better chord tone quality',
            'The adjacent string gets muted, creating dead sounds',
            'Nothing — flat or curved makes no difference',
            'The guitar goes out of tune',
          ],
          correctIdx: 1,
          explanation: 'A flat knuckle lets the finger pad touch and mute the adjacent string, killing its vibration.',
        },
      ],
    },

    // =====================================================================
    // STAGE 11: VICTORY
    // =====================================================================
    {
      id: 'l16_complete',
      type: 'complete',
      label: 'Complete',
      title: 'Left-Hand Position Mastered!',
      vibeDialogue:
        'You now have the perfect left-hand frame! Curved knuckles, fingertip contact, thumb centered, wrist straight. This foundation supports every chord, scale, and riff you will ever play. You are ready to make real music!',
      completionSummary: [
        'Finger numbering: 1=Index, 2=Middle, 3=Ring, 4=Pinky, T=Thumb',
        'Thumb pad centered on back of neck behind fret 2',
        'Curved knuckles — arch like holding a tennis ball',
        'Fingertips only — no flat pads touching adjacent strings',
        'Press just behind the fret wire, not on top of it',
        'Wrist straight and relaxed — never collapsed',
        'Clean ring test: adjacent strings ring freely',
      ],
      badgeTitle: 'Hand Architect',
      badgeDescription: 'Badge Unlocked',
      xpReward: 120,
    },
  ],
};
