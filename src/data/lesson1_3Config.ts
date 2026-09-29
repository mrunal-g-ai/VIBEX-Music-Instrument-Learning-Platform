/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lesson 1.3 — Strings and Their Names
 * Learn the 6 strings: EADGBE numbering, pitch, thickness, and the mnemonic.
 */

import { LessonPlayerConfig } from '../components/lessons/LessonPlayerEngine';

export const LESSON_1_3_CONFIG: LessonPlayerConfig = {
  lessonId: 'lesson_1_3',
  lessonNumber: '1.3',
  title: 'Strings and Their Names',
  subtitle: 'Standard tuning: 6=Low E, 5=A, 4=D, 3=G, 2=B, 1=High E',
  stages: [
    // =====================================================================
    // STAGE 1: INTRO
    // =====================================================================
    {
      id: 'l13_intro',
      type: 'intro',
      label: 'Intro',
      title: 'Meet Your Six Strings',
      vibeDialogue:
        'Guitar strings are numbered from 1 to 6. This is the universal language of tablature, chord diagrams, and every guitar conversation you will ever have. Let us memorize them.',
      subtitle: 'String 6 is the thickest (closest to your chin). String 1 is the thinnest (closest to your knee).',
    },

    // =====================================================================
    // STAGE 2: TEACH — String Numbers & Notes
    // =====================================================================
    {
      id: 'l13_numbering',
      type: 'teach',
      label: 'Numbering',
      title: 'String Numbers & Note Names',
      vibeDialogue:
        'In standard tuning, the six strings from thickest to thinnest are: 6=E, 5=A, 4=D, 3=G, 2=B, 1=E. Notice: the 6th and 1st strings share the same note name E, but the 1st string is two octaves higher!',
      teachPoints: [
        {
          icon: '6️⃣',
          text: 'String 6 (Low E): The thickest, wound copper string. Pitch = E2 (82.4 Hz). This is the deepest, growling bass note on your guitar.',
          color: '#FF8066',
        },
        {
          icon: '5️⃣',
          text: 'String 5 (A): Wound string. Pitch = A2 (110 Hz). This is the root string for A-shape barre chords and the A minor chord.',
          color: '#FBBF24',
        },
        {
          icon: '4️⃣',
          text: 'String 4 (D): Wound string. Pitch = D3 (146.8 Hz). The root of the D major chord and many folk fingerpicking patterns.',
          color: '#54D6C3',
        },
        {
          icon: '3️⃣',
          text: 'String 3 (G): On acoustic, this is the last wound string. On electric, it\'s often plain steel. Pitch = G3 (196 Hz).',
          color: '#8067FF',
        },
        {
          icon: '2️⃣',
          text: 'String 2 (B): Plain steel string. Pitch = B3 (246.9 Hz). This string is unique — the interval from G to B is a major 3rd, not a perfect 4th like the others.',
          color: '#FF5C93',
        },
        {
          icon: '1️⃣',
          text: 'String 1 (High E): The thinnest string. Pitch = E4 (329.6 Hz). Same note as string 6, but two full octaves higher.',
          color: '#45D483',
        },
      ],
      teachTip:
        'Remember: String 1 is the THINNEST string, not the thickest. Beginners often confuse this!',
    },

    // =====================================================================
    // STAGE 3: LISTEN — Hear Each String
    // =====================================================================
    {
      id: 'l13_listen',
      type: 'listen',
      label: 'Hear Them',
      title: 'Listen to Each Open String',
      vibeDialogue:
        'Now let us hear each string. Notice how the pitch rises from the deep growl of string 6 to the bright chime of string 1. Press play on each sample.',
      audioSamples: [
        { label: '6th String — Low E', frequency: 82.41, timbre: 'acoustic', durationMs: 2000 },
        { label: '5th String — A', frequency: 110.0, timbre: 'acoustic', durationMs: 2000 },
        { label: '4th String — D', frequency: 146.83, timbre: 'acoustic', durationMs: 2000 },
        { label: '3rd String — G', frequency: 196.0, timbre: 'acoustic', durationMs: 2000 },
        { label: '2nd String — B', frequency: 246.94, timbre: 'acoustic', durationMs: 2000 },
        { label: '1st String — High E', frequency: 329.63, timbre: 'acoustic', durationMs: 2000 },
      ],
    },

    // =====================================================================
    // STAGE 4: TEACH — The Mnemonic
    // =====================================================================
    {
      id: 'l13_mnemonic',
      type: 'teach',
      label: 'Mnemonic',
      title: 'Memory Trick: Eddie Ate Dynamite',
      vibeDialogue:
        'Here is the classic mnemonic to remember the strings from 6 to 1: Eddie Ate Dynamite, Good Bye Eddie. E - A - D - G - B - E. Say it out loud three times!',
      teachPoints: [
        {
          icon: '🧠',
          text: '"Eddie Ate Dynamite, Good Bye Eddie" — Each first letter matches a string note: E, A, D, G, B, E (from 6th to 1st string).',
          color: '#8067FF',
        },
        {
          icon: '🔄',
          text: 'Reverse mnemonic (1st to 6th): "Every Boy Gets Dessert After Eating" — useful when reading tab from treble to bass.',
          color: '#54D6C3',
        },
      ],
      teachTip:
        'Practice saying the string names while physically touching each string on your guitar. Motor memory + verbal memory = faster learning.',
    },

    // =====================================================================
    // STAGE 5: INTERACTIVE — Pluck & Name Challenge
    // =====================================================================
    {
      id: 'l13_pluck',
      type: 'interactive',
      label: 'Pluck It',
      title: 'Pluck Each String & Say Its Name',
      vibeDialogue:
        'Now, physically pick up your guitar. Starting from string 6, pluck each string one by one and say its name out loud: E, A, D, G, B, E. Do this 3 times.',
      interactionPrompt:
        'Pluck all six strings in order (6 → 1) while saying each note name aloud. Tap "I Did It" each time you complete one full pass.',
      interactionType: 'pluck_strings',
      targetCount: 3,
    },

    // =====================================================================
    // STAGE 6: LISTEN — Thick vs. Thin Comparison
    // =====================================================================
    {
      id: 'l13_compare',
      type: 'listen',
      label: 'Compare',
      title: 'Low E vs. High E',
      vibeDialogue:
        'Listen to the dramatic pitch difference between string 6 (Low E) and string 1 (High E). Same note name, two octaves apart. The low E sounds deep and booming; the high E sounds bright and singing.',
      audioSamples: [
        { label: 'String 6 — Low E (82.4 Hz)', frequency: 82.41, timbre: 'acoustic', durationMs: 2500 },
        { label: 'String 1 — High E (329.6 Hz)', frequency: 329.63, timbre: 'acoustic', durationMs: 2500 },
      ],
    },

    // =====================================================================
    // STAGE 7: TEACH — Wound vs. Plain
    // =====================================================================
    {
      id: 'l13_wound',
      type: 'teach',
      label: 'Construction',
      title: 'Wound vs. Plain Strings',
      vibeDialogue:
        'Guitar strings come in two constructions. Bass strings 6, 5, and 4 are wound — thin wire wrapped around a core for extra mass. Treble strings 2 and 1 are plain steel. String 3 varies by guitar type.',
      teachPoints: [
        {
          icon: '🔩',
          text: 'Wound strings (6, 5, 4): A thin wire is wrapped spirally around a steel core. This adds mass, allowing thicker strings to vibrate at lower frequencies. You can feel the ridges with your fingertip.',
          color: '#FF8066',
        },
        {
          icon: '✨',
          text: 'Plain steel strings (1, 2): Solid steel wire without winding. These produce bright, singing treble tones. They feel smooth under your fingers.',
          color: '#54D6C3',
        },
        {
          icon: '❓',
          text: 'String 3 (G): On acoustic guitars, this is typically wound. On electric guitars, it is usually plain steel. This is why string 3 sometimes feels different from what you expect.',
          color: '#FBBF24',
        },
      ],
    },

    // =====================================================================
    // STAGE 8: MATCH GAME — String Identification
    // =====================================================================
    {
      id: 'l13_match',
      type: 'match_game',
      label: 'Match',
      title: 'String Identification Challenge',
      vibeDialogue:
        'Test your knowledge! Match the description to the correct string.',
      matchItems: [
        {
          prompt: 'The thickest string, tuned to E2 at 82.4 Hz, with the deepest pitch.',
          correctAnswer: 'String 6 (Low E)',
          options: ['String 1 (High E)', 'String 6 (Low E)', 'String 3 (G)', 'String 5 (A)'],
          explanation: 'String 6 is the thickest wound string, producing the lowest guitar note in standard tuning.',
        },
        {
          prompt: 'This string\'s tuning interval to the next string is a major 3rd, not a perfect 4th.',
          correctAnswer: 'String 3 (G)',
          options: ['String 5 (A)', 'String 2 (B)', 'String 3 (G)', 'String 4 (D)'],
          explanation: 'The interval from G (string 3) to B (string 2) is a major 3rd. All other adjacent string intervals are perfect 4ths.',
        },
        {
          prompt: 'The thinnest string, sharing its note name with the thickest string but two octaves higher.',
          correctAnswer: 'String 1 (High E)',
          options: ['String 2 (B)', 'String 1 (High E)', 'String 6 (Low E)', 'String 4 (D)'],
          explanation: 'String 1 (E4) and String 6 (E2) are both E, separated by two octaves.',
        },
      ],
    },

    // =====================================================================
    // STAGE 9: QUIZ — String Mastery
    // =====================================================================
    {
      id: 'l13_quiz',
      type: 'quiz',
      label: 'Quiz',
      title: 'String Mastery Quiz',
      vibeDialogue:
        'Final quiz! Prove you have memorized all six string names, numbers, and tuning.',
      quizQuestions: [
        {
          question: 'What is the standard tuning of guitar strings from 6th to 1st?',
          options: [
            'E - A - D - G - B - E',
            'A - D - G - C - E - A',
            'D - A - D - G - A - D',
            'E - B - G - D - A - E',
          ],
          correctIdx: 0,
          explanation: 'Standard guitar tuning is E-A-D-G-B-E, from string 6 (thickest) to string 1 (thinnest).',
        },
        {
          question: 'Which string number is the THINNEST string?',
          options: ['String 6', 'String 4', 'String 1', 'String 3'],
          correctIdx: 2,
          explanation: 'String 1 is the thinnest, highest-pitched string. String 6 is the thickest.',
        },
        {
          question: 'What is the frequency of the open 5th string (A)?',
          options: ['82 Hz', '110 Hz', '196 Hz', '330 Hz'],
          correctIdx: 1,
          explanation: 'The open A string vibrates at 110 Hz in standard tuning.',
        },
        {
          question: 'Which mnemonic helps remember string order 6 → 1?',
          options: [
            'Every Bad Girl Deserves Apples Everyday',
            'Eddie Ate Dynamite Good Bye Eddie',
            'Easy Access Delivers Great Bass Energy',
            'Elephants And Donkeys Get Big Ears',
          ],
          correctIdx: 1,
          explanation: 'Eddie Ate Dynamite Good Bye Eddie = E-A-D-G-B-E, the classic string mnemonic.',
        },
        {
          question: 'What makes wound strings different from plain steel strings?',
          options: [
            'Wound strings are always shorter',
            'Wound strings have thin wire wrapped around a core for extra mass',
            'Wound strings are made of nylon',
            'There is no physical difference',
          ],
          correctIdx: 1,
          explanation: 'Wound strings have wire spirally wrapped around a steel core, adding mass for lower frequency vibration.',
        },
      ],
    },

    // =====================================================================
    // STAGE 10: VICTORY
    // =====================================================================
    {
      id: 'l13_complete',
      type: 'complete',
      label: 'Complete',
      title: 'Strings Mastered!',
      vibeDialogue:
        'Brilliant! You now know all six string names, numbers, and pitches. Eddie Ate Dynamite Good Bye Eddie — you will never forget! Next: how to hold your guitar properly.',
      completionSummary: [
        'String numbering: 6 (thickest) to 1 (thinnest)',
        'Standard tuning: E - A - D - G - B - E',
        'The mnemonic: Eddie Ate Dynamite Good Bye Eddie',
        'Wound strings (6, 5, 4) vs. plain steel (1, 2)',
        'The major 3rd interval between strings 3 and 2',
        'Two-octave difference between Low E and High E',
      ],
      badgeTitle: 'String Scholar',
      badgeDescription: 'Badge Unlocked',
      xpReward: 100,
    },
  ],
};
