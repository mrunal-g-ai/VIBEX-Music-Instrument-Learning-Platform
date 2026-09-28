/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MasterGuitarLesson,
  GuitarAnatomyHotspot,
  ChordShapeVoicing,
} from '../types/guitarCurriculum';

// =========================================================================
// STANDARD CHORD VOICING DICTIONARY
// =========================================================================
export const CHORD_VOICINGS_LIBRARY: Record<string, ChordShapeVoicing> = {
  'C Major': {
    name: 'C Major',
    strings: ['X', 3, 2, 0, 1, 0],
    fingers: [null, 3, 2, null, 1, null],
    notes: ['X', 'C3', 'E3', 'G3', 'C4', 'E4'],
    rootStringIndex: 1,
  },
  'G Major': {
    name: 'G Major',
    strings: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, null, null, null, 3],
    notes: ['G2', 'B2', 'D3', 'G3', 'B3', 'G4'],
    rootStringIndex: 0,
  },
  'D Major': {
    name: 'D Major',
    strings: ['X', 'X', 0, 2, 3, 2],
    fingers: [null, null, null, 1, 3, 2],
    notes: ['X', 'X', 'D3', 'A3', 'D4', 'F#4'],
    rootStringIndex: 2,
  },
  'E Minor': {
    name: 'E Minor',
    strings: [0, 2, 2, 0, 0, 0],
    fingers: [null, 2, 3, null, null, null],
    notes: ['E2', 'B2', 'E3', 'G3', 'B3', 'E4'],
    rootStringIndex: 0,
  },
  'A Minor': {
    name: 'A Minor',
    strings: ['X', 0, 2, 2, 1, 0],
    fingers: [null, null, 2, 3, 1, null],
    notes: ['X', 'A2', 'E3', 'A3', 'C4', 'E4'],
    rootStringIndex: 1,
  },
  'E Major': {
    name: 'E Major',
    strings: [0, 2, 2, 1, 0, 0],
    fingers: [null, 2, 3, 1, null, null],
    notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
    rootStringIndex: 0,
  },
  'A Major': {
    name: 'A Major',
    strings: ['X', 0, 2, 2, 2, 0],
    fingers: [null, null, 1, 2, 3, null],
    notes: ['X', 'A2', 'E3', 'A3', 'C#4', 'E4'],
    rootStringIndex: 1,
  },
  'F Major (Barre)': {
    name: 'F Major (Barre)',
    strings: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    notes: ['F2', 'C3', 'F3', 'A3', 'C4', 'F4'],
    barreFret: 1,
    barreFinger: 1,
    rootStringIndex: 0,
  },
  'B Minor (Barre)': {
    name: 'B Minor (Barre)',
    strings: ['X', 2, 4, 4, 3, 2],
    fingers: [null, 1, 3, 4, 2, 1],
    notes: ['X', 'B2', 'F#3', 'B3', 'D4', 'F#4'],
    barreFret: 2,
    barreFinger: 1,
    rootStringIndex: 1,
  },
};

// =========================================================================
// GUITAR ANATOMY INTERACTIVE HOTSPOTS
// =========================================================================
export const GUITAR_ANATOMY_HOTSPOTS: GuitarAnatomyHotspot[] = [
  // Body parts
  {
    id: 'soundboard',
    name: 'Soundboard (Top)',
    category: 'body',
    description: 'The solid spruce or cedar top plate that vibrates to project sound into the air.',
    musicalPurpose: 'Responsible for 80% of an acoustic guitars acoustic volume and harmonic resonance.',
    careTip: 'Keep clean with a micro-fiber cloth; avoid rapid humidity swings below 40%.',
    xPercent: 78,
    yPercent: 48,
  },
  {
    id: 'soundhole',
    name: 'Soundhole & Rosette',
    category: 'body',
    description: 'The circular opening that lets air enter and escape as the soundboard vibrates.',
    musicalPurpose: 'Tunes the Helmholtz acoustic body resonance, emphasizing deep rich bass response.',
    careTip: 'Inspect bracing through soundhole annually for any loose struts.',
    xPercent: 68,
    yPercent: 48,
  },
  {
    id: 'bridge-saddle',
    name: 'Bridge & Saddle',
    category: 'body',
    description: 'Transfers string vibrations directly into the soundboard wood grain.',
    musicalPurpose: 'Determines string action height and sets the exact intonation compensation angle.',
    careTip: 'Ensure bone saddle is smooth with no jagged string burrs.',
    xPercent: 86,
    yPercent: 48,
  },
  {
    id: 'pickguard',
    name: 'Pickguard',
    category: 'body',
    description: 'Protective plastic shield preventing pick scratches on the soft lacquer finish.',
    musicalPurpose: 'Preserves the longevity of acoustic tonewood during vigorous rhythmic strumming.',
    careTip: 'Wipe with polish; never use harsh acetone or chemicals.',
    xPercent: 70,
    yPercent: 60,
  },
  // Neck parts
  {
    id: 'fretboard',
    name: 'Fingerboard (Fretboard)',
    category: 'neck',
    description: 'Rosewood, ebony, or maple strip where the fingers press strings against frets.',
    musicalPurpose: 'Provides the geometric playing surface for melodies, intervals, and chord shapes.',
    careTip: 'Condition with lemon or mineral oil twice a year to prevent dry wood cracking.',
    xPercent: 42,
    yPercent: 48,
  },
  {
    id: 'frets',
    name: 'Frets & Fret Wire',
    category: 'neck',
    description: 'Nickel-silver metal strips embedded across the fingerboard at exact mathematical intervals.',
    musicalPurpose: 'Each fret divides string length by the 12th root of 2 (equal temperament semitone).',
    careTip: 'Press fingers immediately behind fret wires for buzz-free tone with minimum effort.',
    xPercent: 46,
    yPercent: 48,
  },
  {
    id: 'nut',
    name: 'The Nut',
    category: 'neck',
    description: 'Bone or synthetic block at the headstock joint guiding strings over the fingerboard.',
    musicalPurpose: 'Defines the zero-fret vibrating end of open strings and controls open string action.',
    careTip: 'Apply graphite (pencil lead) in nut slots during string changes to prevent string binding.',
    xPercent: 24,
    yPercent: 48,
  },
  {
    id: 'truss-rod',
    name: 'Truss Rod',
    category: 'neck',
    description: 'Internal adjustable steel rod running along the inside spine of the wooden neck.',
    musicalPurpose: 'Counters the 150+ lbs of string tension to maintain the ideal slight forward neck relief.',
    careTip: 'Only adjust 1/8 turn at a time with correct Allen wrench; seek luthier guidance if unsure.',
    xPercent: 34,
    yPercent: 40,
  },
  // Headstock
  {
    id: 'tuning-machines',
    name: 'Tuning Pegs & Machine Heads',
    category: 'headstock',
    description: 'Geared worm-drive posts on the headstock used to tighten or loosen strings.',
    musicalPurpose: 'Accurately calibrates pitch to standard 440 Hz (E2-A2-D3-G3-B3-E4).',
    careTip: 'Always tune UP into pitch (flat to sharp) to prevent backlash slippage.',
    xPercent: 12,
    yPercent: 48,
  },
  // Electric Controls
  {
    id: 'pickups',
    name: 'Magnetic Pickups (Electric)',
    category: 'electric',
    description: 'Copper wire coils wrapped around magnetic pole pieces generating electromagnetic current.',
    musicalPurpose: 'Translates steel string vibration into low-impedance electrical audio signals.',
    careTip: 'Adjust pickup height for balanced volume between neck and bridge positions.',
    xPercent: 64,
    yPercent: 42,
  },
  {
    id: 'output-jack',
    name: '1/4" Output Jack',
    category: 'electric',
    description: 'Audio output terminal sending guitar signal through an instrument cable to your amp or audio interface.',
    musicalPurpose: 'Connects VIBEX hardware to digital audio interfaces for real-time DSP pitch tracking.',
    careTip: 'Tighten external hex nut gently; never allow internal wiring harness to twist.',
    xPercent: 92,
    yPercent: 72,
  }
];

// =========================================================================
// MASTER GUITAR LESSON CATALOG (LEVELS 0 TO 48)
// =========================================================================
export const MASTER_GUITAR_LESSONS: MasterGuitarLesson[] = [
  // -----------------------------------------------------------------------
  // LEVEL 0: GUITAR ORIENTATION
  // -----------------------------------------------------------------------
  {
    id: 'guitar_0.1_orientation',
    level: 0,
    stageName: 'Stage 1: Orientation & Ergonomics',
    levelTitle: 'Level 0 — Guitar Orientation',
    lessonNumber: '0.1',
    title: 'What Is a Guitar?',
    subtitle: 'Acoustic, Electric & Classical anatomy, scale lengths, and how strings produce acoustic sound',
    durationMinutes: 6,
    xpReward: 100,
    primarySkill: 'theory',
    secondarySkills: ['technique'],
    pedagogicalPillars: {
      hands: 'Gentle exploratory handling of the neck, body, and headstock balance.',
      brain: 'Physics of vibrating strings, harmonic overtones, and instrument family classification.',
      ears: 'Acoustic resonance vs. electric magnetic pickup tone colors.',
      heart: 'Connecting with the historical instrument that shaped global songwriting.',
      repertoire: 'Understanding the instrument choices behind legendary recordings.',
      creativity: 'Selecting the acoustic or electric tone palette that fits your creative voice.',
      performance: 'Understanding instrument scale length and physical comfort on stage.'
    },
    contentRules: {
      whatAmILearning: 'The fundamental classifications of guitars (Acoustic, Electric, Classical) and how string tension produces acoustic waves.',
      whyAmILearningIt: 'To establish complete mechanical awareness of your instrument before developing playing habits.',
      whatDoesItLookLike: 'Comparing the hollow soundboard of an acoustic, the solid body and pickups of an electric, and the wide nylon neck of a classical.',
      whatDoesItSoundLike: 'Warm woody natural projection (Acoustic) vs. crystalline chime and sustained amplifier bite (Electric).',
      howDoIPhysicallyDoIt: 'Rest the waist of the guitar securely on your leg, keeping neck elevated at an upward angle.',
      whatShouldMyLeftHandDo: 'Cradle the neck loosely without squeezing the wood.',
      whatShouldMyRightHandDo: 'Rest the right forearm naturally over the upper body contour.',
      whatStringsFretsFingersAreInvolved: 'All 6 open strings vibrating freely.',
      whatMistakesShouldIAvoid: ['Hunching over the instrument', 'Allowing the neck to point downward toward the floor'],
      howDoesVibeCheckMe: 'Visual landmark check for natural upright spinal posture and instrument tilt angle.',
      howDoIPracticeIt: 'Sit with your guitar for 3 minutes without playing, ensuring relaxed shoulders.',
      whereIsItUsedMusically: 'Foundational across every musical genre in human history.',
      howDoIKnowIMasteredIt: 'You can accurately identify acoustic vs electric elements and hold the instrument without neck fatigue.'
    },
    steps: [
      {
        id: 's01-1',
        type: 'INTRO',
        title: 'Welcome to VIBEX Guitar',
        vibeDialogue: 'Welcome! I am Vibe, your personal AI guitar mentor. Before we touch a fret, lets understand the magical wooden instrument in your hands.',
      },
      {
        id: 's01-2',
        type: 'HEAR_CONCEPT',
        title: 'Acoustic Sound Production',
        vibeDialogue: 'Listen to this acoustic pluck. The string vibrates, travels through the bone saddle, into the spruce soundboard, and breathes through the soundhole.',
        audioFrequencies: [82.41, 146.83, 329.63],
        audioPlaybackType: 'strum'
      },
      {
        id: 's01-3',
        type: 'MINI_CHALLENGE',
        title: 'Guitar Classification Quiz',
        vibeDialogue: 'Quick check to test your guitar knowledge!',
        miniChallenge: {
          question: 'Which type of guitar typically relies on magnetic pickups connected to an amplifier rather than a hollow soundboard?',
          options: ['Steel-string Acoustic Guitar', 'Solid-body Electric Guitar', 'Classical Nylon-string Guitar'],
          correctIndex: 1,
          explanation: 'Solid-body electric guitars do not possess a hollow sound chamber; they rely on electromagnetic pickups to sense steel string vibration and send signals to an amplifier.'
        }
      },
      {
        id: 's01-4',
        type: 'MASTERY',
        title: 'Orientation Mastered',
        vibeDialogue: 'Splendid! You understand how guitars breathe sound. Now lets explore every specific anatomical part of your guitar!'
      }
    ]
  },

  {
    id: 'guitar_0.2_anatomy',
    level: 0,
    stageName: 'Stage 1: Orientation & Ergonomics',
    levelTitle: 'Level 0 — Guitar Orientation',
    lessonNumber: '0.2',
    title: 'Guitar Anatomy Explorer',
    subtitle: 'Interactive exploration of Body, Neck, Headstock, and Electric controls',
    durationMinutes: 8,
    xpReward: 120,
    primarySkill: 'theory',
    secondarySkills: ['fretboard', 'technique'],
    pedagogicalPillars: {
      hands: 'Navigating the nut, fret markers, bridge pins, and tuning machines.',
      brain: 'Understanding the role of the truss rod, saddle compensation, and fret wire spacing.',
      ears: 'Observing how touching parts (like muting at the nut or bridge) alters the sound.',
      heart: 'Respect for luthiery craft and instrument maintenance.',
      repertoire: 'Identifying where specific playing techniques (like bridge palm muting) occur.',
      creativity: 'Using different pickup switches or strumming zones to color your acoustic tone.',
      performance: 'Handling strap buttons and output jacks safely during live performances.'
    },
    contentRules: {
      whatAmILearning: 'The names, locations, and mechanical functions of every key part of acoustic and electric guitars.',
      whyAmILearningIt: 'To communicate accurately as a musician and understand how adjustments impact your sound and playability.',
      whatDoesItLookLike: 'An interactive 2D diagram highlighting Headstock, Nut, Frets, Soundhole, Bridge, and Pickups.',
      whatDoesItSoundLike: 'Hearing the difference between open string ringing at the nut versus bridge vibrations.',
      howDoIPhysicallyDoIt: 'Touch each anatomical part as Vibe introduces it.',
      whatShouldMyLeftHandDo: 'Explore the neck, feeling the smooth fingerboard wood and metal fret wires.',
      whatShouldMyRightHandDo: 'Locate the bridge, soundhole, and pickup controls.',
      whatStringsFretsFingersAreInvolved: 'All parts connecting from headstock to tailpiece.',
      whatMistakesShouldIAvoid: ['Confusing frets with fret wires', 'Turning tuning pegs without plucking string'],
      howDoesVibeCheckMe: 'Interactive tap quizzes asking you to identify parts like the nut, truss rod, or bridge saddle.',
      howDoIPracticeIt: 'Walk through the 11 anatomical hotspots on your physical guitar.',
      whereIsItUsedMusically: 'Essential for tuning, string changes, truss rod setups, and tone sculpting.',
      howDoIKnowIMasteredIt: 'You can point to and name any part of the guitar within 2 seconds without hesitation.'
    },
    steps: [
      {
        id: 's02-1',
        type: 'INTRO',
        title: 'The Anatomy of Sound',
        vibeDialogue: 'Your guitar is divided into three main zones: the Headstock, the Neck, and the Body. Lets inspect each one!'
      },
      {
        id: 's02-2',
        type: 'INTERACTIVE_VISUAL',
        title: 'Inspect the Nut & Frets',
        vibeDialogue: 'Look at the Nut — the small bone piece where the headstock meets the neck. It slots the strings in place and defines their open pitch vibrating length.'
      },
      {
        id: 's02-3',
        type: 'MINI_CHALLENGE',
        title: 'Nut Identification',
        vibeDialogue: 'Test your anatomical eye!',
        miniChallenge: {
          question: 'What is the primary function of the guitar nut?',
          options: [
            'To guide the strings from the fretboard to the tuning machines and set string spacing',
            'To adjust the volume of the guitar',
            'To connect the guitar strap to the neck'
          ],
          correctIndex: 0,
          explanation: 'The nut provides precisely measured slots that anchor strings at the headstock joint, determining open-string string height (action) and spacing across the fingerboard.'
        }
      },
      {
        id: 's02-4',
        type: 'MASTERY',
        title: 'Anatomy Mastered',
        vibeDialogue: 'Exceptional! You now know your guitar inside and out. Next up: holding your guitar with effortless, injury-free ergonomics!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 1: HOLDING THE GUITAR
  // -----------------------------------------------------------------------
  {
    id: 'guitar_1.1_sitting_posture',
    level: 1,
    stageName: 'Stage 1: Orientation & Ergonomics',
    levelTitle: 'Level 1 — Holding the Guitar',
    lessonNumber: '1.1',
    title: 'Sitting Position & Ergonomics',
    subtitle: 'Optimal back alignment, guitar body balance, 30° neck angle, and avoiding shoulder fatigue',
    durationMinutes: 7,
    xpReward: 100,
    primarySkill: 'technique',
    secondarySkills: ['performance'],
    pedagogicalPillars: {
      hands: 'Establishing completely neutral, floating wrists with zero tension.',
      brain: 'Body mechanics: spine vertical alignment and diaphragmatic breathing.',
      ears: 'Hearing the full resonance of a guitar unencumbered by a muffled chest press.',
      heart: 'Relaxed, calm focus that turns 30 minutes of practice into pure joy.',
      repertoire: 'Comfort that allows 2-hour uninterrupted band rehearsals.',
      creativity: 'Effortless physical access across all 12+ frets.',
      performance: 'Stage-ready composure and posture from day one.'
    },
    contentRules: {
      whatAmILearning: 'The correct seated posture (casual vs. classical) that protects your lower back, shoulders, and wrists.',
      whyAmILearningIt: 'Bad posture causes tendonitis and limits hand agility. Proper ergonomics allows you to practice for hours with zero fatigue.',
      whatDoesItLookLike: 'Back straight, sitting on the front half of the bench, feet flat, waist of guitar resting on thigh, neck tilted upward at 30° to 40°.',
      whatDoesItSoundLike: 'Clear uninhibited wood projection because the back and sides of the guitar are not smothered by your body.',
      howDoIPhysicallyDoIt: 'Sit tall without slouching back into a chair; let your right forearm drape over the top body edge.',
      whatShouldMyLeftHandDo: 'Float freely along the neck without bearing the weight of the guitar.',
      whatShouldMyRightHandDo: 'Rest gently on the upper bout, acting as a natural counter-balance.',
      whatStringsFretsFingersAreInvolved: 'All strings, neck, and soundboard.',
      whatMistakesShouldIAvoid: [
        'Hunching forward to stare at the fretboard',
        'Resting the neck parallel to the floor (strains the left wrist)',
        'Squeezing the neck with your left arm to hold the guitar up'
      ],
      howDoesVibeCheckMe: 'Camera landmark analysis checking shoulder symmetry, cervical spine tilt, and guitar neck upward inclination.',
      howDoIPracticeIt: 'Practice the 20-second hands-free balance drill: remove left hand completely; guitar must stay balanced on your thigh without falling.',
      whereIsItUsedMusically: 'Every daily practice session and studio recording take.',
      howDoIKnowIMasteredIt: 'You can hold playing position for 20 minutes without back ache or left hand gripping tension.'
    },
    steps: [
      {
        id: 's11-1',
        type: 'INTRO',
        title: 'Ergonomic Foundation',
        vibeDialogue: 'Good posture is the secret superpower of every great guitarist. Lets set your body up for relaxed, effortless mastery.'
      },
      {
        id: 's11-2',
        type: 'WATCH_VIBE',
        title: 'Watch the Balanced Seated Position',
        vibeDialogue: 'Notice how the neck tilts upward at 35 degrees. Your left wrist should be virtually straight, like reaching out for a handshake.',
        poseTarget: {
          checkType: 'sitting_angle',
          guidance: 'Sit on front half of chair; neck angled 30-40 degrees upward.',
          warningIfFails: 'Neck is drooping down toward the floor! Raise the headstock toward shoulder height.'
        }
      },
      {
        id: 's11-3',
        type: 'USER_ATTEMPT',
        title: 'Hands-Free Balance Test',
        vibeDialogue: 'Rest the guitar on your right thigh. Now take your left hand completely off the neck! Can your body hold the guitar stable without hands?'
      },
      {
        id: 's11-4',
        type: 'MASTERY',
        title: 'Seated Posture Verified',
        vibeDialogue: 'Flawless balance! Your guitar rests securely, leaving both hands 100% free to make music. Next: left-hand claw posture!'
      }
    ]
  },

  {
    id: 'guitar_1.4_left_hand_posture',
    level: 1,
    stageName: 'Stage 1: Orientation & Ergonomics',
    levelTitle: 'Level 1 — Holding the Guitar',
    lessonNumber: '1.4',
    title: 'Left-Hand Claw Mechanics & Thumb Spine',
    subtitle: 'Thumb centerline positioning, curved knuckle arches, and fingertip perpendicular contact',
    durationMinutes: 8,
    xpReward: 120,
    primarySkill: 'technique',
    secondarySkills: ['fretboard'],
    pedagogicalPillars: {
      hands: 'Curving proximal and distal knuckles like a cat claw; thumb pad on neck center.',
      brain: 'Muscle memory of hand frame without tendon strain.',
      ears: 'Eliminating fret buzz and string muting right at the physical source.',
      heart: 'Delicate touch: pressing only with the exact force needed for clean sound.',
      repertoire: 'Ensuring open strings ring cleanly under chords like C Major and A Minor.',
      creativity: 'Effortless reach across multiple frets for melodic runs.',
      performance: 'Consistent fingertip intonation under fast stage conditions.'
    },
    contentRules: {
      whatAmILearning: 'The biomechanically correct left-hand hand frame: curved knuckles, thumb pad on neck centerline, perpendicular fingertip contact.',
      whyAmILearningIt: 'Flat fingers choke adjacent strings, creating dead thuds instead of sparkling acoustic chords.',
      whatDoesItLookLike: 'Fingers arched like a dome holding an apple. Thumb rests behind fret 2 in the center of the wooden back.',
      whatDoesItSoundLike: 'Every fretted note rings loud, clear, and sustained with zero fret buzz.',
      howDoIPhysicallyDoIt: 'Place the thumb pad on the center back spine of the neck. Arch your four fingers over the fretboard, touching strings only with the very tips of your fingers.',
      whatShouldMyLeftHandDo: 'Keep the wrist straight and relaxed; do not collapse the wrist against the bottom of the neck.',
      whatShouldMyRightHandDo: 'Pluck individual strings to test whether fretted notes ring cleanly.',
      whatStringsFretsFingersAreInvolved: 'Fingers 1, 2, 3, 4 on frets 1, 2, 3.',
      whatMistakesShouldIAvoid: [
        'Wrapping the thumb completely over the top of the neck',
        'Collapsing the first finger knuckle flat on neighboring strings',
        'Squeezing with excessive brute force until fingers turn white'
      ],
      howDoesVibeCheckMe: 'Camera checks knuckle curvature and thumb placement behind neck; audio analyzer checks string ringing sustain.',
      howDoIPracticeIt: 'Fret string 2 with finger 1; pluck string 1 (high E). It must ring open with crystal clarity.',
      whereIsItUsedMusically: 'Every single chord, scale, and lead riff you will ever play.',
      howDoIKnowIMasteredIt: 'You can press fret 1 on string 2 while string 1 and 3 ring completely unobstructed.'
    },
    steps: [
      {
        id: 's14-1',
        type: 'INTRO',
        title: 'The Classical Claw',
        vibeDialogue: 'Imagine holding a fresh green tennis ball in your left hand. That relaxed, rounded arch is the exact shape we need on the fretboard!'
      },
      {
        id: 's14-2',
        type: 'WATCH_VIBE',
        title: 'Observe the Knuckle Arch',
        vibeDialogue: 'Look closely at my knuckles. Both the base knuckle and the tip knuckle are bent 90 degrees. My thumb rests flat behind the neck, opposite fret 2.'
      },
      {
        id: 's14-3',
        type: 'PLACE_FINGER',
        title: 'Place Finger 1 with Arched Knuckle',
        vibeDialogue: 'Place finger 1 (index) on fret 1 of the B string (string 2). Keep the knuckle arched high so high E is not touched!',
        fingerPlacement: { finger: 1, stringIndex: 4, fret: 1, note: 'C' }
      },
      {
        id: 's14-4',
        type: 'MASTERY',
        title: 'Left Hand Claw Mastered',
        vibeDialogue: 'Both strings ring like bells! You have mastered the classical claw. Now lets pluck our very first open string notes!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 2: FIRST NOTES & OPEN STRINGS
  // -----------------------------------------------------------------------
  {
    id: 'guitar_2.1_open_strings',
    level: 2,
    stageName: 'Stage 2: First Sounds & Mechanics',
    levelTitle: 'Level 2 — First Notes',
    lessonNumber: '2.1',
    title: 'Learn the Six Strings & Tuning (EADGBE)',
    subtitle: 'String numbering 6 to 1, pitch recognition, downstroke picking, and alternate picking',
    durationMinutes: 10,
    xpReward: 150,
    primarySkill: 'rhythm',
    secondarySkills: ['earTraining', 'technique'],
    pedagogicalPillars: {
      hands: 'Right hand pick angle and stroke follow-through across strings.',
      brain: 'Standard tuning memory: 6=Low E, 5=A, 4=D, 3=G, 2=B, 1=High E.',
      ears: 'Associating pitch height: thick 6th string (low pitch) to thin 1st string (high pitch).',
      heart: 'Feeling the raw acoustical power of six in-tune strings vibrating together.',
      repertoire: 'Identifying the foundation strings for famous open chord basslines.',
      creativity: 'Experimenting with open string drones and ringing overtones.',
      performance: 'Checking tuning silently with digital meters before stage performance.'
    },
    contentRules: {
      whatAmILearning: 'The names and numbers of all 6 guitar strings (Low E to High E) and how to pick each cleanly with downward pick strokes.',
      whyAmILearningIt: 'String names and numbers are the universal language of guitar tabs, chord diagrams, and band communication.',
      whatDoesItLookLike: 'Thickest copper/nickel wound string (6th) at top; thinnest bare steel string (1st) at bottom.',
      whatDoesItSoundLike: 'Low growl (E2 = 82 Hz) ascending steadily to high chime (E4 = 330 Hz).',
      howDoIPhysicallyDoIt: 'Hold your pick between thumb and index finger; stroke downward across one string at a time.',
      whatShouldMyLeftHandDo: 'Rest lightly on the guitar body or neck without pressing strings.',
      whatShouldMyRightHandDo: 'Pluck string with pick angled slightly inward (~15°); follow through to rest above the next string.',
      whatStringsFretsFingersAreInvolved: 'Strings 6, 5, 4, 3, 2, 1 all open (fret 0).',
      whatMistakesShouldIAvoid: [
        'Confusing String 1 with String 6 (String 1 is the thinnest high pitch string!)',
        'Digging the pick too deeply into strings causing hand to get stuck'
      ],
      howDoesVibeCheckMe: 'VIBEX YIN algorithm detects each frequency: 82.4 Hz, 110 Hz, 146.8 Hz, 196 Hz, 246.9 Hz, 329.6 Hz.',
      howDoIPracticeIt: 'Pluck 6th to 1st string saying the note names aloud: "Eddie Ate Dynamite Good Bye Eddie".',
      whereIsItUsedMusically: 'Tuning, open chords, pedal point basslines, and open-string folk riffs.',
      howDoIKnowIMasteredIt: 'You can pluck any string Vibe names within 1 beat at 60 BPM with 100% accuracy.'
    },
    steps: [
      {
        id: 's21-1',
        type: 'INTRO',
        title: 'Meet Your Six Strings',
        vibeDialogue: 'Guitar strings are numbered from 1 to 6. Remember: String 1 is the THINNEST string closest to your knee, and String 6 is the THICKEST string closest to your chin!'
      },
      {
        id: 's21-2',
        type: 'HEAR_CONCEPT',
        title: 'Listen to the Six Strings',
        vibeDialogue: 'Listen to all six strings from thickest to thinnest: E, A, D, G, B, E.',
        audioFrequencies: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63],
        audioPlaybackType: 'scale'
      },
      {
        id: 's21-3',
        type: 'USER_ATTEMPT',
        title: 'Pluck Each String in Sequence',
        vibeDialogue: 'Now your turn! Pluck string 6, then 5, 4, 3, 2, and 1 with a steady downstroke.',
        exerciseRepsRequired: 6
      },
      {
        id: 's21-4',
        type: 'MASTERY',
        title: 'Six Strings Mastered',
        vibeDialogue: 'Every string registered in perfect pitch! You are now ready for your first finger independence exercise: The Spider Walk!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 3: FINGER INDEPENDENCE (THE SPIDER WALK)
  // -----------------------------------------------------------------------
  {
    id: 'guitar_3.1_spider_walk',
    level: 3,
    stageName: 'Stage 2: First Sounds & Mechanics',
    levelTitle: 'Level 3 — Finger Independence',
    lessonNumber: '3.1',
    title: 'The Legendary Spider Walk (1-2-3-4)',
    subtitle: 'Frets 1, 2, 3, 4 across all 6 strings; pinky control and synchronization with right-hand alternate picking',
    durationMinutes: 10,
    xpReward: 160,
    primarySkill: 'technique',
    secondarySkills: ['rhythm', 'fretboard'],
    pedagogicalPillars: {
      hands: 'Independent neuromuscular activation of ring and pinky fingers without sympathetic twitching.',
      brain: 'Chromatic fretboard geometry and 1-finger-per-fret discipline.',
      ears: 'Listening for precise note length and zero premature muting.',
      heart: 'Patience and mindful relaxation during technical conditioning.',
      repertoire: 'The foundational agility needed for Eric Clapton, Hendrix, and fast solo passages.',
      creativity: 'Enables intricate melodic inventions without physical limitations.',
      performance: 'The quintessential pre-concert backstage warm-up drill.'
    },
    contentRules: {
      whatAmILearning: 'The 1-2-3-4 chromatic finger independence drill (The Spider Walk) across all six strings.',
      whyAmILearningIt: 'The ring and pinky fingers share tendons; this exercise builds neural autonomy and clean fretboard speed.',
      whatDoesItLookLike: 'Fingers 1, 2, 3, 4 placing consecutively on frets 1, 2, 3, 4. Crucial rule: do not lift earlier fingers until you shift strings!',
      whatDoesItSoundLike: 'Four smooth chromatic notes: F, F#, G, G# at a steady metronome pulse.',
      howDoIPhysicallyDoIt: 'Place finger 1 on fret 1. Pluck. While holding finger 1 down, place finger 2 on fret 2. Pluck. Then 3 on fret 3, and 4 on fret 4.',
      whatShouldMyLeftHandDo: 'Keep thumb steady behind fret 2. Keep fingers arched perpendicularly.',
      whatShouldMyRightHandDo: 'Alternate strictly between downstrokes (↓) and upstrokes (↑).',
      whatStringsFretsFingersAreInvolved: 'Strings 6 through 1, frets 1-2-3-4, fingers 1-2-3-4.',
      whatMistakesShouldIAvoid: [
        'Lifting finger 1 the moment finger 2 touches the string (kills independence!)',
        'Letting the pinky curl into the palm in tension'
      ],
      howDoesVibeCheckMe: 'Audio tracks 4 consecutive clean pitches with equal duration; camera tracks finger hover proximity.',
      howDoIPracticeIt: 'Run the pattern slowly at 60 BPM with metronome; only increase by 5 BPM once 100% clean.',
      whereIsItUsedMusically: 'Warm-up routines of every professional classical, rock, jazz, and flamenco guitarist.',
      howDoIKnowIMasteredIt: 'You can play 1-2-3-4 across all 6 strings at 80 BPM with zero fret buzz and locked alternate picking.'
    },
    steps: [
      {
        id: 's31-1',
        type: 'INTRO',
        title: 'The Guitarists Gym',
        vibeDialogue: 'Welcome to the Spider Walk — the single most effective exercise for developing lightning-fast, independent fingers!'
      },
      {
        id: 's31-2',
        type: 'WATCH_VIBE',
        title: 'Watch the "Keep Fingers Down" Rule',
        vibeDialogue: 'Notice how finger 1 remains glued to fret 1 even when finger 4 stretches to fret 4. This forces your brain to separate each fingers muscles.'
      },
      {
        id: 's31-3',
        type: 'CONTROLLED_EXERCISE',
        title: 'Execute 1-2-3-4 on 6th String',
        vibeDialogue: 'Now on string 6: Fret 1 (Finger 1) -> Fret 2 (Finger 2) -> Fret 3 (Finger 3) -> Fret 4 (Finger 4). Steady 60 BPM!',
        tempoBpm: 60,
        timeSignature: '4/4',
        exerciseRepsRequired: 4
      },
      {
        id: 's31-4',
        type: 'MASTERY',
        title: 'Spider Walk Mastered',
        vibeDialogue: 'Tremendous discipline! Your ring and pinky are gaining independent strength. Now lets build our first true open chord: C Major!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 6: OPEN CHORDS (C MAJOR DEEP DIVE)
  // -----------------------------------------------------------------------
  {
    id: 'guitar_6.1_c_major',
    level: 6,
    stageName: 'Stage 4: Open Chords & Strumming Mastery',
    levelTitle: 'Level 6 — Open Chords',
    lessonNumber: '6.1',
    title: 'Your First C Major Chord',
    subtitle: 'The 15-step interactive chord engine: finger-by-finger construction, knuckle arching, individual string checks & strumming',
    durationMinutes: 12,
    xpReward: 200,
    primarySkill: 'chords',
    secondarySkills: ['chordChanges', 'rhythm', 'theory'],
    pedagogicalPillars: {
      hands: 'Finger 1 on B string (fret 1), Finger 2 on D string (fret 2), Finger 3 on A string (fret 3). 6th string muted.',
      brain: 'C Major Triad Formula: Root (C) + Major 3rd (E) + Perfect 5th (G).',
      ears: 'Hearing the bright, joyful, fully resolved acoustic consonance of a major triad.',
      heart: 'The emotional feeling of musical home and resolution.',
      repertoire: 'Let It Be (Beatles), Knockin on Heavens Door (Dylan), Tum Hi Ho (Aashiqui 2).',
      creativity: 'The backbone chord for writing your own first songs.',
      performance: 'Strumming strings 5 to 1 without accidentally striking the low 6th string.'
    },
    contentRules: {
      whatAmILearning: 'The full open C Major chord voicing: X-3-2-0-1-0.',
      whyAmILearningIt: 'C Major is the anchor chord of Western harmony and appears in thousands of timeless songs.',
      whatDoesItLookLike: 'Fingers 1, 2, 3 spanning across frets 1, 2, and 3 in a diagonal staircase shape.',
      whatDoesItSoundLike: 'A bright, balanced, consonant 5-string harmonic chord.',
      howDoIPhysicallyDoIt: 'Place Finger 1 on fret 1 of string 2. Place Finger 2 on fret 2 of string 4. Stretch Finger 3 to fret 3 of string 5. Strum strings 5 to 1.',
      whatShouldMyLeftHandDo: 'Arch knuckles high like cat claws so string 1 (high E) and string 3 (G) ring open and clear.',
      whatShouldMyRightHandDo: 'Rest thumb lightly touching the edge of string 6 to mute it; strum smoothly across strings 5 to 1 with a pick or thumb.',
      whatStringsFretsFingersAreInvolved: 'Strings 5 (fret 3, finger 3), 4 (fret 2, finger 2), 3 (open), 2 (fret 1, finger 1), 1 (open). String 6 muted (X).',
      whatMistakesShouldIAvoid: [
        'Muting the 1st string (high E) with the underside of finger 1',
        'Letting string 6 boom open (sounds dissonant and muddy in C major!)',
        'Pressing with flat finger pads instead of sharp vertical tips'
      ],
      howDoesVibeCheckMe: 'VIBEX step-by-step string inspector listens to each string 5, 4, 3, 2, 1 individually to verify zero muted or buzzing strings.',
      howDoIPracticeIt: 'Build the chord, test every string, strum 4 times, remove hand, shake fingers, rebuild in under 3 seconds.',
      whereIsItUsedMusically: 'The I chord in the key of C Major; central to pop, rock, folk, and Indian fusion.',
      howDoIKnowIMasteredIt: 'All 5 strings ring cleanly with zero fret buzz, and you can form the shape from memory in under 2 seconds.'
    },
    steps: [
      {
        id: 's61-1',
        type: 'INTRO',
        title: 'Welcome to C Major',
        vibeDialogue: 'This is C Major — the king of open chords! We will build it one finger at a time so every single string rings like crystal.'
      },
      {
        id: 's61-2',
        type: 'HEAR_CONCEPT',
        title: 'Hear the C Major Triad',
        vibeDialogue: 'Listen to the full C Major chord: C, E, G, C, E. Feel its warmth and triumphant brightness.',
        chordVoicing: CHORD_VOICINGS_LIBRARY['C Major'],
        audioFrequencies: [130.81, 164.81, 196.00, 261.63, 329.63],
        audioPlaybackType: 'strum'
      },
      {
        id: 's61-3',
        type: 'PLACE_FINGER',
        title: 'Step 1: Place Finger 1',
        vibeDialogue: 'Place finger 1 (index) on Fret 1 of String 2 (B string). This gives us our high C note.',
        fingerPlacement: { finger: 1, stringIndex: 4, fret: 1, note: 'C' }
      },
      {
        id: 's61-4',
        type: 'PLACE_FINGER',
        title: 'Step 2: Place Finger 2',
        vibeDialogue: 'Now place finger 2 (middle) on Fret 2 of String 4 (D string). This gives us the Major 3rd: E.',
        fingerPlacement: { finger: 2, stringIndex: 2, fret: 2, note: 'E' }
      },
      {
        id: 's61-5',
        type: 'PLACE_FINGER',
        title: 'Step 3: Place Finger 3',
        vibeDialogue: 'Stretch finger 3 (ring) over to Fret 3 of String 5 (A string). This is our root note C!',
        fingerPlacement: { finger: 3, stringIndex: 1, fret: 3, note: 'C' }
      },
      {
        id: 's61-6',
        type: 'PLAY_CHORD',
        title: 'Step 4: Individual String Test & Strum',
        vibeDialogue: 'Now test each string from 5 down to 1. Notice string 3 and string 1 are open. Strum strings 5 to 1 with a smooth downward brush!',
        chordVoicing: CHORD_VOICINGS_LIBRARY['C Major']
      },
      {
        id: 's61-7',
        type: 'MASTERY',
        title: 'C Major Mastered!',
        vibeDialogue: 'Incredible! All 5 strings rang with brilliant clarity. You have unlocked C Major in your permanent chord vocabulary!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 12: PENTATONIC MASTERY & LEAD GUITAR
  // -----------------------------------------------------------------------
  {
    id: 'guitar_12.1_pentatonic_box1',
    level: 12,
    stageName: 'Stage 5: Scales, CAGED & Barre Chords',
    levelTitle: 'Level 12 — Pentatonic Mastery',
    lessonNumber: '12.1',
    title: 'Minor Pentatonic Box 1 Architecture',
    subtitle: 'The 5 essential scale degrees (1-b3-4-5-b7), alternate picking mechanics, and root-note targeting',
    durationMinutes: 14,
    xpReward: 250,
    primarySkill: 'scales',
    secondarySkills: ['lead', 'improvisation', 'theory'],
    pedagogicalPillars: {
      hands: 'Fingers 1 and 4 on frets 5 and 8 (strings 6, 2, 1); fingers 1 and 3 on frets 5 and 7 (strings 5, 4, 3).',
      brain: 'Formula: Root (1) + Minor 3rd (b3) + Perfect 4th (4) + Perfect 5th (5) + Minor 7th (b7).',
      ears: 'The quintessential gritty, emotional rock and blues scale sound.',
      heart: 'Connecting with vocal soulfulness and blues bending emotion.',
      repertoire: 'Led Zeppelin, Pink Floyd, Eric Clapton, BB King, A.R. Rahman guitar leads.',
      creativity: 'The primary launchpad for crafting your own improvised guitar solos.',
      performance: 'Hitting root notes on strong beats over any 12-bar blues progression.'
    },
    contentRules: {
      whatAmILearning: 'The complete Minor Pentatonic Scale Box 1 in A Minor at the 5th fret.',
      whyAmILearningIt: 'Box 1 is the most iconic, widely played lead guitar pattern in history, enabling immediate improvisation.',
      whatDoesItLookLike: 'A two-octave rectangular fretboard box spanning from fret 5 to fret 8 across all six strings.',
      whatDoesItSoundLike: 'The soulful blues-rock sound of legendary guitar solos.',
      howDoIPhysicallyDoIt: 'Play fret 5 with finger 1, fret 8 with finger 4. Move to next string: fret 5 with finger 1, fret 7 with finger 3.',
      whatShouldMyLeftHandDo: 'Keep thumb centered behind fret 6. Stay in 5th position without sliding your wrist.',
      whatShouldMyRightHandDo: 'Alternate strictly: Down, Up, Down, Up across every single note.',
      whatStringsFretsFingersAreInvolved: 'Strings 6 to 1: 5-8, 5-7, 5-7, 5-7, 5-8, 5-8.',
      whatMistakesShouldIAvoid: [
        'Using finger 3 instead of pinky (finger 4) on the 8th fret (causes awkward cramps)',
        'Picking only in downstrokes instead of alternate picking'
      ],
      howDoesVibeCheckMe: 'Audio pitch tracker evaluates all 12 scale notes; timing engine measures tempo consistency at 80 BPM.',
      howDoIPracticeIt: 'Ascend and descend with a metronome; stop and sustain each root note (A).',
      whereIsItUsedMusically: 'Over any A Minor, A Blues, or C Major chord progression.',
      howDoIKnowIMasteredIt: 'You can play Box 1 up and down at 90 BPM with clean alternate picking and find every root note instantly.'
    },
    steps: [
      {
        id: 's121-1',
        type: 'INTRO',
        title: 'The Solos Blueprint',
        vibeDialogue: 'Welcome to the holy grail of guitar solos: Minor Pentatonic Box 1. Just 5 magical notes per octave that make any solo sing!'
      },
      {
        id: 's121-2',
        type: 'HEAR_CONCEPT',
        title: 'Hear the Pentatonic Scale',
        vibeDialogue: 'Listen to the 12-note ladder ascending through two full octaves from low A to high A.',
        audioFrequencies: [110.00, 130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00],
        audioPlaybackType: 'scale'
      },
      {
        id: 's121-3',
        type: 'CONTROLLED_EXERCISE',
        title: 'Ascend Box 1 with Alternate Picking',
        vibeDialogue: 'Play with me at 75 BPM. Down-stroke on fret 5, Up-stroke on fret 8! Feel the groove locked to the metronome.',
        tempoBpm: 75,
        timeSignature: '4/4',
        exerciseRepsRequired: 12
      },
      {
        id: 's121-4',
        type: 'MASTERY',
        title: 'Pentatonic Box 1 Mastered!',
        vibeDialogue: 'Electric performance! You are now equipped with the vocabulary to solo over rock, blues, and pop tracks worldwide!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // LEVEL 48: PROFESSIONAL MUSICIAN SKILLS
  // -----------------------------------------------------------------------
  {
    id: 'guitar_48.1_final_mastery',
    level: 48,
    stageName: 'Stage 8: Virtuosity, Rig Setup & Professional Musician',
    levelTitle: 'Level 48 — Professional Musician Skills',
    lessonNumber: '48.1',
    title: 'The Final Professional Challenge',
    subtitle: 'Independent song analysis, real-time chart transcription, arrangement, modal improvisation & recording assessment',
    durationMinutes: 30,
    xpReward: 1000,
    primarySkill: 'performance',
    secondarySkills: ['improvisation', 'composition', 'earTraining', 'theory'],
    pedagogicalPillars: {
      hands: 'Total virtuoso control: sweeps, hybrid picking, bends, muting, and effortless fingerboard navigation.',
      brain: 'Roman numeral harmonic analysis, Nashville Number System, modal interchange.',
      ears: 'Instantaneous transcription of unfamiliar chord progressions and melodic hooks.',
      heart: 'Emotional storytelling, dynamics, stage charisma, and performance presence.',
      repertoire: 'Mastery of an expansive multi-genre repertoire from memory.',
      creativity: 'Crafting unique arrangements, intros, solos, and modulations on the fly.',
      performance: 'Session-ready execution with a click track and full audio/camera telemetry.'
    },
    contentRules: {
      whatAmILearning: 'The capstone VIBEX 16-step professional musician assessment: taking an unfamiliar piece of music and completely unpacking, arranging, performing, and recording it.',
      whyAmILearningIt: 'To transform you from a guitar student into a self-sufficient, professional, adaptable recording and touring artist.',
      whatDoesItLookLike: 'Full studio workstation setup: DAW tracking, live camera poise monitor, and real-time DSP pitch telemetry.',
      whatDoesItSoundLike: 'A polished, radio-ready performance with dynamics, flawless rhythm, and expressive soloing.',
      howDoIPhysicallyDoIt: 'Listen to the mystery audio track. Identify key, tempo, meter, and chords; record rhythm and lead takes.',
      whatShouldMyLeftHandDo: 'Deliver clean barre chords, triad voice leading, and pitch-perfect whole-step bends.',
      whatShouldMyRightHandDo: 'Adapt dynamically from delicate fingerpicking to aggressive pick attack.',
      whatStringsFretsFingersAreInvolved: 'Entire 24-fret guitar fingerboard across all keys and modes.',
      whatMistakesShouldIAvoid: [
        'Rushing the tempo during lead transitions',
        'Overplaying during rhythm accompaniment sections'
      ],
      howDoesVibeCheckMe: 'VIBEX evaluates pitch intonation (>=92%), tempo deviation (<=5ms), and ergonomic camera posture.',
      howDoIPracticeIt: 'Run through full 30-minute uninterrupted concert rehearsal with take recording enabled.',
      whereIsItUsedMusically: 'Professional recording studios, world tours, orchestra pits, and music education masterclasses.',
      howDoIKnowIMasteredIt: 'You achieve a 3-star Grandmaster rating on the final 16-point professional evaluation rubric.'
    },
    steps: [
      {
        id: 's48-1',
        type: 'INTRO',
        title: 'The Final Frontier',
        vibeDialogue: 'This is the pinnacle of the VIBEX curriculum. You began knowing nothing; today, you will independently analyze, play, arrange, and record an unfamiliar song!'
      },
      {
        id: 's48-2',
        type: 'OBJECTIVE',
        title: 'The 16-Step Challenge',
        vibeDialogue: 'You will listen, determine the key and tempo, identify the chords, compose a rhythm groove, craft an expressive solo, and record your master take.'
      },
      {
        id: 's48-3',
        type: 'ASSESSMENT',
        title: 'Full Studio Evaluation Take',
        vibeDialogue: 'Click is rolling. Camera is monitoring posture. Audio engine is tracking intonation. Play from your heart!',
        durationSeconds: 180
      },
      {
        id: 's48-4',
        type: 'MASTERY',
        title: 'VIBEX Grandmaster Certified!',
        vibeDialogue: 'Sensational! You have conquered the complete VIBEX Master Guitar Curriculum. You are no longer just a learner — you are an empowered, versatile musician ready for any stage in the world!'
      }
    ]
  }
];
