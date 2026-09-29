/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Lesson 1.2 — Guitar Anatomy
 * Interactive discovery of Body, Neck, Headstock, and their components.
 */

import { LessonPlayerConfig } from '../components/lessons/LessonPlayerEngine';

export const LESSON_1_2_CONFIG: LessonPlayerConfig = {
  lessonId: 'lesson_1_2',
  lessonNumber: '1.2',
  title: 'Guitar Anatomy',
  subtitle: 'Discover every part of your guitar — from headstock to bridge.',
  achievementId: undefined, // No specific achievement for this lesson yet
  stages: [
    // =====================================================================
    // STAGE 1: INTRO
    // =====================================================================
    {
      id: 'l12_intro',
      type: 'intro',
      label: 'Intro',
      title: 'The Anatomy of Your Guitar',
      vibeDialogue:
        'Your guitar is divided into three main zones: the Headstock, the Neck, and the Body. Today, we will examine each one in detail so you can speak the language of a real guitarist.',
      subtitle: 'Learn the names, locations, and functions of every important part.',
    },

    // =====================================================================
    // STAGE 2: EXPLORE — The Three Zones
    // =====================================================================
    {
      id: 'l12_zones',
      type: 'explore',
      label: 'Three Zones',
      title: 'Explore the Three Zones',
      vibeDialogue:
        'A guitar has three main zones. Tap each zone to discover what it does. The Headstock holds the tuning pegs. The Neck has the fretboard and frets. The Body produces and projects sound.',
      exploreParts: [
        {
          id: 'headstock',
          label: 'Headstock',
          description:
            'The headstock is the top section of the guitar. It holds the tuning machines (tuning pegs) that tighten or loosen each string to control pitch. Most headstocks have the guitar brand logo.',
          color: '#8067FF',
        },
        {
          id: 'neck',
          label: 'Neck',
          description:
            'The neck is the long wooden piece connecting the headstock to the body. It contains the fretboard (fingerboard) where your left hand presses strings against metal frets to change pitch.',
          color: '#54D6C3',
        },
        {
          id: 'body',
          label: 'Body',
          description:
            'The body is the large section of the guitar. On an acoustic guitar, it is hollow with a soundhole to amplify vibrations. On an electric guitar, it is solid with magnetic pickups.',
          color: '#FF8066',
        },
      ],
    },

    // =====================================================================
    // STAGE 3: TEACH — Headstock Parts
    // =====================================================================
    {
      id: 'l12_headstock',
      type: 'teach',
      label: 'Headstock',
      title: 'Inside the Headstock',
      vibeDialogue:
        'Let us zoom into the headstock. This is where precision tuning happens. Two important components live here.',
      teachPoints: [
        {
          icon: '🔩',
          text: 'Tuning Machines (Machine Heads): Geared worm-drive posts that tighten or loosen each string. Always tune UP into pitch to prevent backlash slippage.',
          color: '#8067FF',
        },
        {
          icon: '🎵',
          text: 'The Nut: A small bone or synthetic block at the junction of the headstock and neck. It has 6 precisely-cut slots that guide each string and define the open-string vibrating length.',
          color: '#54D6C3',
        },
      ],
      teachTip:
        'Pro Tip: Apply graphite (pencil lead) in nut slots when changing strings. This prevents strings from binding and going out of tune.',
    },

    // =====================================================================
    // STAGE 4: EXPLORE — Neck Components
    // =====================================================================
    {
      id: 'l12_neck_parts',
      type: 'explore',
      label: 'Neck Parts',
      title: 'Explore the Neck',
      vibeDialogue:
        'The neck is where all the musical magic happens. Tap each part to discover how frets, the fingerboard, and the truss rod work together.',
      exploreParts: [
        {
          id: 'fretboard',
          label: 'Fretboard (Fingerboard)',
          description:
            'A smooth strip of rosewood, ebony, or maple where your fingers press strings against frets. The fretboard has dot markers at frets 3, 5, 7, 9, 12, 15, and 17 to help you navigate.',
          color: '#FF8066',
        },
        {
          id: 'frets',
          label: 'Fret Wires',
          description:
            'Thin nickel-silver metal strips embedded across the fingerboard at mathematically precise intervals. Each fret raises pitch by one semitone (half step). There are typically 20-24 frets.',
          color: '#FBBF24',
        },
        {
          id: 'truss_rod',
          label: 'Truss Rod',
          description:
            'An internal adjustable steel rod running through the center of the neck. It counters the 150+ lbs of string tension to keep the neck straight with a slight forward relief.',
          color: '#8067FF',
        },
        {
          id: 'dot_markers',
          label: 'Position Markers',
          description:
            'Small dots or inlays on frets 3, 5, 7, 9, 12 (double dot), 15, 17, 19, and 21. They serve as visual landmarks so you know exactly where you are on the neck without counting frets.',
          color: '#54D6C3',
        },
      ],
    },

    // =====================================================================
    // STAGE 5: TEACH — Body Components
    // =====================================================================
    {
      id: 'l12_body',
      type: 'teach',
      label: 'Body Parts',
      title: 'The Body: Where Sound Lives',
      vibeDialogue:
        'The body is the resonating chamber of your guitar. On acoustics, vibrations travel from the strings through the bridge into the soundboard, and the soundhole lets air escape to project sound.',
      teachPoints: [
        {
          icon: '🪵',
          text: 'Soundboard (Top): The solid spruce or cedar top plate that vibrates to project acoustic sound. This one piece of wood is responsible for approximately 80% of your guitar\'s volume.',
          color: '#FF8066',
        },
        {
          icon: '⭕',
          text: 'Soundhole & Rosette: The circular opening that lets air enter and escape as the soundboard vibrates. The decorative rosette around it is both aesthetic and structural.',
          color: '#54D6C3',
        },
        {
          icon: '🌉',
          text: 'Bridge & Saddle: The bridge is glued to the soundboard and anchors the strings. The saddle (a thin bone piece in the bridge) transfers string vibrations directly into the wood.',
          color: '#FBBF24',
        },
        {
          icon: '🛡️',
          text: 'Pickguard: A plastic shield protecting the soft lacquer finish from pick scratches during vigorous strumming. Not all guitars have one.',
          color: '#8067FF',
        },
      ],
      teachTip:
        'Important: Never rest drinks or objects on your guitar body. Temperature and humidity changes can crack the soundboard.',
    },

    // =====================================================================
    // STAGE 6: EXPLORE — Electric Guitar Extras
    // =====================================================================
    {
      id: 'l12_electric',
      type: 'explore',
      label: 'Electric Parts',
      title: 'Electric Guitar Components',
      vibeDialogue:
        'Electric guitars have additional components that acoustic guitars do not. These are what allow the guitar to send its signal to an amplifier.',
      exploreParts: [
        {
          id: 'pickups',
          label: 'Magnetic Pickups',
          description:
            'Copper wire coils wrapped around magnetic pole pieces. When a steel string vibrates above the pickup, it creates an electromagnetic signal that gets sent to the amplifier. Most electrics have 2-3 pickups.',
          color: '#FF5C93',
        },
        {
          id: 'pickup_selector',
          label: 'Pickup Selector Switch',
          description:
            'A toggle or blade switch that lets you choose which pickup(s) are active. Neck pickup = warm/mellow tone. Bridge pickup = bright/cutting tone. Middle = blended.',
          color: '#8067FF',
        },
        {
          id: 'volume_tone',
          label: 'Volume & Tone Knobs',
          description:
            'Rotary potentiometers that control output volume and high-frequency roll-off. Rolling back the tone knob creates a warmer, darker sound for jazz playing.',
          color: '#54D6C3',
        },
        {
          id: 'output_jack',
          label: '1/4" Output Jack',
          description:
            'The audio output terminal where you plug in your instrument cable. This sends the guitar signal to your amplifier, effects pedals, or audio interface for recording.',
          color: '#FBBF24',
        },
      ],
    },

    // =====================================================================
    // STAGE 7: MATCH GAME — Identify Parts
    // =====================================================================
    {
      id: 'l12_match',
      type: 'match_game',
      label: 'Part Match',
      title: 'Match the Guitar Part',
      vibeDialogue:
        'Time to test your memory! Match each description to the correct guitar part.',
      matchItems: [
        {
          prompt: 'This component guides strings from the fretboard to the tuning machines and defines the open-string vibrating length.',
          correctAnswer: 'The Nut',
          options: ['The Bridge', 'The Nut', 'The Pickguard', 'The Truss Rod'],
          explanation:
            'The Nut sits at fret 0 (where the headstock meets the neck) and slots each string precisely.',
        },
        {
          prompt: 'This internal steel rod counters 150+ lbs of string tension to keep the neck properly aligned.',
          correctAnswer: 'Truss Rod',
          options: ['Truss Rod', 'Fret Wire', 'Bridge Saddle', 'Tuning Peg'],
          explanation:
            'The Truss Rod runs inside the neck and is adjusted with an Allen wrench to correct neck bow.',
        },
        {
          prompt: 'This transfers string vibrations directly into the soundboard for acoustic volume projection.',
          correctAnswer: 'Bridge & Saddle',
          options: ['Soundhole', 'Bridge & Saddle', 'Pickguard', 'Pickup'],
          explanation:
            'The saddle sits in the bridge slot and transmits vibration energy into the top wood.',
        },
        {
          prompt: 'On an electric guitar, this component translates steel string vibration into electromagnetic audio signals.',
          correctAnswer: 'Magnetic Pickup',
          options: ['Nut', 'Magnetic Pickup', 'Tone Knob', 'Fret Wire'],
          explanation:
            'Magnetic pickups use copper coils around magnets to sense string movement and generate an electrical signal.',
        },
      ],
    },

    // =====================================================================
    // STAGE 8: QUIZ — Anatomy Mastery
    // =====================================================================
    {
      id: 'l12_quiz',
      type: 'quiz',
      label: 'Quiz',
      title: 'Anatomy Mastery Quiz',
      vibeDialogue:
        'Final challenge! Answer these questions to prove you know your guitar inside and out.',
      quizQuestions: [
        {
          question: 'What is the primary function of the guitar nut?',
          options: [
            'To guide the strings from fretboard to tuning machines and set string spacing',
            'To adjust the volume of the guitar',
            'To connect the guitar strap to the neck',
            'To amplify string vibrations electronically',
          ],
          correctIdx: 0,
          explanation:
            'The nut provides precisely measured slots that anchor strings at the headstock end, setting open-string action and spacing.',
        },
        {
          question: 'How many semitones does each fret raise the pitch by?',
          options: ['Two semitones', 'Half a semitone', 'One semitone (half step)', 'One whole tone'],
          correctIdx: 2,
          explanation:
            'Each fret divides the string length by the 12th root of 2, raising pitch by exactly one semitone.',
        },
        {
          question: 'What part of the guitar body amplifies acoustic vibrations naturally?',
          options: [
            'The Pickguard',
            'The Soundboard (Top)',
            'The Pickup Selector',
            'The Truss Rod',
          ],
          correctIdx: 1,
          explanation:
            'The soundboard (top plate) vibrates with the string energy, projecting acoustic sound through the soundhole.',
        },
        {
          question: 'Why should you "tune UP into pitch" rather than down?',
          options: [
            'To make strings last longer',
            'To prevent tuning machine backlash slippage',
            'To make the guitar louder',
            'There is no difference',
          ],
          correctIdx: 1,
          explanation:
            'Tuning up engages the gear teeth firmly. Tuning down can leave slack in the gears, causing the string to slip flat.',
        },
      ],
    },

    // =====================================================================
    // STAGE 9: VICTORY
    // =====================================================================
    {
      id: 'l12_complete',
      type: 'complete',
      label: 'Complete',
      title: 'Anatomy Mastered!',
      vibeDialogue:
        'You now know your guitar inside and out! You can name every component from headstock to bridge. Next lesson: learning the names of all six strings!',
      completionSummary: [
        'The three guitar zones: Headstock, Neck, and Body',
        'Tuning machines, nut, and how they control pitch',
        'Fretboard, fret wires, and position markers',
        'Soundboard, soundhole, bridge, and saddle mechanics',
        'Electric guitar pickups, selector switch, and output jack',
      ],
      badgeTitle: 'Anatomy Expert',
      badgeDescription: 'Badge Unlocked',
      xpReward: 120,
    },
  ],
};
