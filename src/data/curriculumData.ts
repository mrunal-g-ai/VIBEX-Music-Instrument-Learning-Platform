/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InstrumentCurriculum, BansuriScale, EarTrainingQuestion, PracticeNode, CurriculumModule, LessonTutorial, InstrumentType } from '../types/vibex';

export const BANSURI_SCALES: BansuriScale[] = [
  { id: 'c-medium', name: 'C Medium (Kafi Thaat)', basePitchName: 'C4', baseFrequency: 261.63, type: 'Medium', lengthInches: 19 },
  { id: 'e-bass', name: 'E Bass (Carnatic / Hindustani Standard)', basePitchName: 'E3', baseFrequency: 164.81, type: 'Bass', lengthInches: 30 },
  { id: 'g-natural', name: 'G Natural Medium', basePitchName: 'G4', baseFrequency: 392.00, type: 'Medium', lengthInches: 15 },
  { id: 'd-medium', name: 'D Medium', basePitchName: 'D4', baseFrequency: 293.66, type: 'Medium', lengthInches: 17.5 },
  { id: 'f-bass', name: 'F Bass', basePitchName: 'F3', baseFrequency: 174.61, type: 'Bass', lengthInches: 28 },
  { id: 'a-bass', name: 'A Bass', basePitchName: 'A3', baseFrequency: 220.00, type: 'Bass', lengthInches: 23 },
];

export const CURRICULA: Record<string, InstrumentCurriculum> = {
  // =========================================================================
  // A. BANSURI (INDIAN FLUTE)
  // =========================================================================
  bansuri: {
    instrument: 'bansuri',
    displayName: 'Bamboo Bansuri Flute',
    tagline: 'Embouchure lip aperture, 6-hole pad sealing, and classical Raga micro-tonal meend',
    accentColor: '#54D6C3',
    focusAreas: [
      'Embouchure formation & lip aperture',
      'Blowhole placement & air angle',
      '6-hole fleshy pad finger coverage',
      'Air stream pressure & stability',
      'Swara accuracy (Sa, Re, Ga, Ma, Pa, Dha, Ni)',
      'Komal / Teevra microtonal variations',
      'Alankar rhythmic permutations',
      'Scale Calibration (C Medium, E Bass, G Natural)',
    ],
    levels: [
      {
        levelNumber: 1,
        title: 'Tier 1: Absolute Beginner',
        tierName: 'Absolute Beginner',
        durationSpan: 'Weeks 1–8',
        dailyPracticeMinutes: '30–45 min/day',
        focusSummary: 'Embouchure formation, blowhole alignment, blowing stability, 6-hole finger coverage, basic Swara production (Sa, Re, Ga, Pa).',
        outcome: 'Produce clear, non-airy tone on Sa, Re, Ga, Pa with stable abdominal support.',
        accentColor: '#54D6C3',
        requiredXp: 0,
        unlocked: true,
        completed: true,
        completionPercent: 100,
        dailyRoutine: [
          { activity: 'Diaphragmatic breathing & lip posture', minutes: 5 },
          { activity: 'Long-tone Swar Sadhana (Sa–Pa)', minutes: 10 },
          { activity: '6-hole pad sealing drills', minutes: 10 },
          { activity: 'Simple Saral Sargam melodies', minutes: 10 },
        ],
        repertoireMilestones: [
          { title: 'Saral Sargam (Aroha/Avroha)', artistOrComposer: 'Traditional Bilawal', type: 'Traditional Raga', keyOrRaga: 'Bilawal / C Medium', tempoBpm: 55 },
          { title: 'Devotional Aarti Melody', artistOrComposer: 'Traditional Bhajan', type: 'Indian/Hindi', keyOrRaga: 'Bilawal Thaat', tempoBpm: 60 },
        ],
        exercises: [
          {
            id: 'bansuri-t1-ex1',
            title: 'Blowhole Alignment & Pure Sa Resonance',
            subtitle: 'Lower lip covering 1/3 of blowhole. Top 3 holes sealed by Left Hand.',
            durationMinutes: 8,
            difficulty: 1,
            goal: 'Sustain pure Sa tonic for 8+ seconds without air leakage.',
            category: 'posture',
            tempoBpm: 50,
            timeSignature: '4/4',
            keySignature: 'C Natural Scale',
            notes: [
              { id: 'b-t1-1', name: 'Sa (C4)', swara: 'Sa', frequency: 261.63, durationMs: 2500, holes: [true, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t1-2', name: 'Sa (C4)', swara: 'Sa', frequency: 261.63, durationMs: 2500, holes: [true, true, true, false, false, false], startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Sit tall with spine aligned. Lower lip rests gently against blowhole covering 1/3. Direct focused air stream across outer edge.',
              commonMistakes: ['Covering too much of blowhole', 'Puffing cheeks instead of abdominal push', 'Pressing hole edges with fingertips instead of pads'],
              correctiveTip: 'Cover hole 3 completely to fix pitch leakage; seal with finger pads, not tips.'
            }
          },
          {
            id: 'bansuri-t1-ex2',
            title: 'Basic Swara Production: Sa – Re – Ga – Pa',
            subtitle: 'Smooth stepwise release with 45-degree elevated elbows',
            durationMinutes: 10,
            difficulty: 1,
            goal: 'Transition cleanly across fundamental Swaras maintaining steady breath velocity.',
            category: 'scales_alankars',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'C Natural Scale',
            notes: [
              { id: 'b-t1-3', name: 'Sa', swara: 'Sa', frequency: 261.63, durationMs: 1200, holes: [true, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t1-4', name: 'Re', swara: 'Re', frequency: 293.66, durationMs: 1200, holes: [true, true, false, false, false, false], startTimeMs: 1200 },
              { id: 'b-t1-5', name: 'Ga', swara: 'Ga', frequency: 329.63, durationMs: 1200, holes: [true, false, false, false, false, false], startTimeMs: 2400 },
              { id: 'b-t1-6', name: 'Pa', swara: 'Pa', frequency: 392.00, durationMs: 2000, holes: [true, true, true, true, true, true], startTimeMs: 3600 },
            ],
            postureGuidance: {
              ideal: 'Keep wrists relaxed and fingers curved like holding a bird. Maintain 45° angle on right elbow.',
              commonMistakes: ['Dropping right elbow causing bansuri downward skew', 'Lifting fingers too high off holes'],
              correctiveTip: 'Keep fingers hovering 1 cm above holes for rapid, clean responses.'
            }
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Tier 2: Early Intermediate',
        tierName: 'Early Intermediate',
        durationSpan: 'Months 2–6',
        dailyPracticeMinutes: '45–60 min/day',
        focusSummary: 'Full Saptak navigation (Mandra, Madhya, Taar), 10 fundamental Alankar practice patterns, half-hole finger control techniques.',
        outcome: 'Navigate 2 octaves fluently, execute 3-note and skip alankars at 75 BPM.',
        accentColor: '#54D6C3',
        requiredXp: 300,
        unlocked: true,
        completed: false,
        completionPercent: 40,
        dailyRoutine: [
          { activity: 'Swar Sadhana in Mandra (low) Saptak', minutes: 10 },
          { activity: '10 Alankars (straight, double, triple)', minutes: 15 },
          { activity: 'Half-hole komal placement drills', minutes: 10 },
          { activity: 'Raag Bilawal bandish with backing', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Raag Bilawal Bandish in Teental', artistOrComposer: 'Traditional Hindustani', type: 'Traditional Raga', keyOrRaga: 'Bilawal / C Medium', tempoBpm: 68 },
          { title: 'Achyutam Keshavam Bhajan', artistOrComposer: 'Devotional Classical', type: 'Indian/Hindi', keyOrRaga: 'Bilawal Thaat', tempoBpm: 72 },
        ],
        exercises: [
          {
            id: 'bansuri-t2-ex1',
            title: 'Saptak Octave Leap: Madhya Sa to Taar Sa',
            subtitle: 'Embouchure aperture narrowing for upper register overtones without overblowing',
            durationMinutes: 10,
            difficulty: 2,
            goal: 'Tighten lip aperture to sound pristine Taar Sa (523 Hz) without harsh breath split.',
            category: 'technique',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'C Natural Scale',
            notes: [
              { id: 'b-t2-1', name: 'Sa (Madhya)', swara: 'Sa', frequency: 261.63, durationMs: 1500, holes: [true, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t2-2', name: 'Pa (Madhya)', swara: 'Pa', frequency: 392.00, durationMs: 1500, holes: [true, true, true, true, true, true], startTimeMs: 1500 },
              { id: 'b-t2-3', name: 'Ṡa (Taar)', swara: 'Ṡa', frequency: 523.25, durationMs: 2000, holes: [false, true, true, false, false, false], startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Bring lips forward slightly to narrow aperture for Taar saptak. Maintain steady diaphragm pressure.',
              commonMistakes: ['Blowing with forced breath speed causing shrieking tone', 'Tensing neck muscles'],
              correctiveTip: 'Think of blowing cold air onto a spoonful of hot soup—focused and narrow.'
            }
          },
          {
            id: 'bansuri-t2-ex2',
            title: 'Fundamental Alankar 3: SaReGa - ReGaMa - GaMaPa',
            subtitle: 'Rhythmic finger articulation across 3-note scalar groupings',
            durationMinutes: 12,
            difficulty: 2,
            goal: 'Execute three-note groupings evenly with metronome at 72 BPM.',
            category: 'scales_alankars',
            tempoBpm: 72,
            timeSignature: '4/4',
            keySignature: 'C Natural Scale',
            notes: [
              { id: 'b-t2-4', name: 'Sa', swara: 'Sa', frequency: 261.63, durationMs: 500, holes: [true, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t2-5', name: 'Re', swara: 'Re', frequency: 293.66, durationMs: 500, holes: [true, true, false, false, false, false], startTimeMs: 500 },
              { id: 'b-t2-6', name: 'Ga', swara: 'Ga', frequency: 329.63, durationMs: 500, holes: [true, false, false, false, false, false], startTimeMs: 1000 },
              { id: 'b-t2-7', name: 'Re', swara: 'Re', frequency: 293.66, durationMs: 500, holes: [true, true, false, false, false, false], startTimeMs: 1500 },
              { id: 'b-t2-8', name: 'Ga', swara: 'Ga', frequency: 329.63, durationMs: 500, holes: [true, false, false, false, false, false], startTimeMs: 2000 },
              { id: 'b-t2-9', name: 'Ma', swara: 'Ma', frequency: 349.23, durationMs: 500, holes: [false, true, true, false, false, false], startTimeMs: 2500 },
            ],
            postureGuidance: {
              ideal: 'Fingers strike holes softly like raindrops without audible thumping.',
              commonMistakes: ['Rushing tempo on ascending phrases', 'Uneven finger lift timing'],
              correctiveTip: 'Keep metronome click centered on every 3rd note pulse.'
            }
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Tier 3: Intermediate',
        tierName: 'Intermediate',
        durationSpan: 'Months 6–18',
        dailyPracticeMinutes: '60–90 min/day',
        focusSummary: 'Komal and Teevra Swara control, introductory Meend (slur/glide), tempo management in Teental (16-beat cycle).',
        outcome: 'Master smooth glissando Meend from Pa to Ga and control Teevra Ma in Raag Yaman bandish.',
        accentColor: '#54D6C3',
        requiredXp: 800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Meend slide practice (Ni–Dha–Pa)', minutes: 15 },
          { activity: 'Teental 16-beat rhythmic clapping & flute entry', minutes: 15 },
          { activity: 'Raag Bhairavi & Raag Kafi komal swara drills', minutes: 20 },
          { activity: 'Bandish improvisation & phrasing', minutes: 20 },
        ],
        repertoireMilestones: [
          { title: 'Raag Yaman Vilambit Bandish', artistOrComposer: 'Traditional Kalyan', type: 'Traditional Raga', keyOrRaga: 'Yaman / Teental', tempoBpm: 60 },
          { title: 'Bhairavi Thumri Melody', artistOrComposer: 'Traditional Semi-Classical', type: 'Traditional Raga', keyOrRaga: 'Bhairavi', tempoBpm: 64 },
        ],
        exercises: [
          {
            id: 'bansuri-t3-ex1',
            title: 'Teevra Ma & Komal Ni Intonation',
            subtitle: 'Open hole shading for precise sharp fourth and flat seventh microtones',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Sound clean Teevra Ma in Raag Yaman with exact ±5 cent accuracy.',
            category: 'raga',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'Raag Yaman',
            notes: [
              { id: 'b-t3-1', name: 'Ni.', swara: 'Ni.', frequency: 246.94, durationMs: 1000, holes: [true, true, true, true, false, false], startTimeMs: 0 },
              { id: 'b-t3-2', name: 'Re', swara: 'Re', frequency: 293.66, durationMs: 1000, holes: [true, true, false, false, false, false], startTimeMs: 1000 },
              { id: 'b-t3-3', name: 'Ga', swara: 'Ga', frequency: 329.63, durationMs: 1000, holes: [true, false, false, false, false, false], startTimeMs: 2000 },
              { id: 'b-t3-4', name: 'Ma (Teevra)', swara: 'Ma#', frequency: 369.99, durationMs: 1500, holes: [false, false, false, false, false, false], startTimeMs: 3000 },
              { id: 'b-t3-5', name: 'Dha', swara: 'Dha', frequency: 440.00, durationMs: 1500, holes: [true, true, true, true, true, false], startTimeMs: 4500 },
            ],
            postureGuidance: {
              ideal: 'Glide slowly off the hole edge to initiate fluid Indian Meend.',
              commonMistakes: ['Jerking fingers off holes breaking the continuous sound wave', 'Breath drop during slide'],
              correctiveTip: 'Peel finger slowly from hole like sticky tape; maintain air stream through the shift.'
            }
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Tier 4: Advanced',
        tierName: 'Advanced',
        durationSpan: 'Years 2–4',
        dailyPracticeMinutes: '90–120 min/day',
        focusSummary: 'Raga fundamentals (Raga Bhupali & Raga Yaman), Gamak execution, high-speed Alankar patterns, breath control in long phrases.',
        outcome: 'Perform full Alaap and Jod in Raag Bhupali with rapid Gamak breath oscillations.',
        accentColor: '#54D6C3',
        requiredXp: 1600,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Gamak diaphragmatic pulses at 80 BPM', minutes: 20 },
          { activity: 'Raag Bhupali Alaap & Jod elaboration', minutes: 30 },
          { activity: 'Fast Drut Taans across 2.5 octaves', minutes: 25 },
          { activity: 'Long phrase circular breathing conditioning', minutes: 25 },
        ],
        repertoireMilestones: [
          { title: 'Raag Bhupali Drut Bandish in Teental', artistOrComposer: 'Traditional Kalyan', type: 'Traditional Raga', keyOrRaga: 'Bhupali Pentatonic', tempoBpm: 92 },
          { title: 'Raag Darbari Alap Excerpt', artistOrComposer: 'Mian Tansen Tradition', type: 'Traditional Raga', keyOrRaga: 'Darbari Kanada', tempoBpm: 48 },
        ],
        exercises: [
          {
            id: 'bansuri-t4-ex1',
            title: 'Raag Bhupali Pentatonic Alaap & Gamak Pulses',
            subtitle: 'Sa - Re - Ga - Pa - Dha ascending with breath tremors',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Execute diaphragmatic Gamak oscillations on Ga and Dha with majestic resonance.',
            category: 'raga',
            tempoBpm: 75,
            timeSignature: '4/4',
            keySignature: 'Raag Bhupali',
            notes: [
              { id: 'b-t4-1', name: 'Sa', swara: 'Sa', frequency: 261.63, durationMs: 1000, holes: [true, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t4-2', name: 'Re', swara: 'Re', frequency: 293.66, durationMs: 1000, holes: [true, true, false, false, false, false], startTimeMs: 1000 },
              { id: 'b-t4-3', name: 'Ga', swara: 'Ga', frequency: 329.63, durationMs: 1500, holes: [true, false, false, false, false, false], startTimeMs: 2000 },
              { id: 'b-t4-4', name: 'Pa', swara: 'Pa', frequency: 392.00, durationMs: 1000, holes: [true, true, true, true, true, true], startTimeMs: 3500 },
              { id: 'b-t4-5', name: 'Dha', swara: 'Dha', frequency: 440.00, durationMs: 2000, holes: [true, true, true, true, true, false], startTimeMs: 4500 },
            ],
            postureGuidance: {
              ideal: 'Support gamaks with deep lower abdominal contractions, never through lip pinching.',
              commonMistakes: ['Throat constriction', 'Losing pitch intonation during fast pulses'],
              correctiveTip: 'Pulse from your solar plexus like laughing gently while maintaining steady embouchure.'
            }
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Tier 5: Professional',
        tierName: 'Professional',
        durationSpan: 'Months 16+',
        dailyPracticeMinutes: '2–3 hours/day',
        focusSummary: 'Raga development (Aalap, Jod, Jhala), complex Taan patterns, performance recording, and advanced expression.',
        outcome: 'Deliver 30-minute concert raga recitals with intricate Jhala cycles and master studio recording.',
        accentColor: '#54D6C3',
        requiredXp: 2800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Concert Alap & Jod elaboration in Teental', minutes: 40 },
          { activity: 'Jhala high-speed rhythmic stroke mechanics', minutes: 30 },
          { activity: 'Sargam & Bol-Taan virtuoso runs', minutes: 30 },
          { activity: 'Studio mic placement & A/B recording analysis', minutes: 30 },
        ],
        repertoireMilestones: [
          { title: 'Concert Raag Yaman Complete (Alap, Jod, Jhala & Drut Gat)', artistOrComposer: 'Pt. Hariprasad Chaurasia style', type: 'Traditional Raga', keyOrRaga: 'Yaman / Teental', tempoBpm: 120 },
          { title: 'Kun Faya Kun Sufi Classical Fusion', artistOrComposer: 'A.R. Rahman', type: 'Indian/Hindi', keyOrRaga: 'Bhairav / Sufi', tempoBpm: 80 },
        ],
        exercises: [
          {
            id: 'bansuri-t5-ex1',
            title: 'Jhala Virtuoso Rhythmic Pulse & Fast Saptak Taans',
            subtitle: 'Taar saptak rapid ornamentation with tabla dynamic synchronization',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Perform 16-beat Jhala cycle at 120+ BPM with laser-accurate intonation.',
            category: 'repertoire',
            tempoBpm: 120,
            timeSignature: '16/4',
            keySignature: 'Raag Yaman',
            notes: [
              { id: 'b-t5-1', name: 'Ṡa', swara: 'Ṡa', frequency: 523.25, durationMs: 400, holes: [false, true, true, false, false, false], startTimeMs: 0 },
              { id: 'b-t5-2', name: 'Ni', swara: 'Ni', frequency: 493.88, durationMs: 400, holes: [true, true, true, true, false, false], startTimeMs: 400 },
              { id: 'b-t5-3', name: 'Dha', swara: 'Dha', frequency: 440.00, durationMs: 400, holes: [true, true, true, true, true, false], startTimeMs: 800 },
              { id: 'b-t5-4', name: 'Pa', swara: 'Pa', frequency: 392.00, durationMs: 800, holes: [true, true, true, true, true, true], startTimeMs: 1200 },
            ],
            postureGuidance: {
              ideal: 'Flawless concert poise; relaxed cervical spine and effortless circular breathing flow.',
              commonMistakes: ['Fatigue leading to drooping right shoulder', 'Loss of flute angle on fast runs'],
              correctiveTip: 'Keep instrument locked into the jaw shelf; move only finger pads.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // B. KEYBOARD / PIANO
  // =========================================================================
  piano: {
    instrument: 'piano',
    displayName: 'Keyboard & Grand Piano',
    tagline: 'Master ergonomic hand arch, finger independence, and polyphonic phrasing',
    accentColor: '#8067FF',
    focusAreas: [
      'Hand posture & relaxed wrist slope',
      'Curved finger mechanics (holding tennis ball)',
      'Independent two-hand playing',
      'Major & minor scale thumb-under crossings',
      'Chord inversions (root, 1st, 2nd)',
      'Sheet music reading (treble & bass clef)',
      'Rhythm precision & metronome ladder',
    ],
    levels: [
      {
        levelNumber: 1,
        title: 'Tier 1: Absolute Beginner',
        tierName: 'Absolute Beginner',
        durationSpan: 'Weeks 1–8',
        dailyPracticeMinutes: '30–45 min/day',
        focusSummary: 'Posture, key identification, Middle C position, 5-finger pattern scales, quarter/half note rhythm matching.',
        outcome: 'Play 5-finger patterns cleanly in C major with both hands and match quarter/half note pulses.',
        accentColor: '#8067FF',
        requiredXp: 0,
        unlocked: true,
        completed: true,
        completionPercent: 100,
        dailyRoutine: [
          { activity: 'Seated posture & finger stretching', minutes: 5 },
          { activity: 'Middle C 5-finger patterns (RH & LH)', minutes: 10 },
          { activity: 'Quarter / half note metronome drill', minutes: 10 },
          { activity: 'Beginner songs (Ode to Joy, Twinkle Twinkle)', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Ode to Joy (Beethoven Theme)', artistOrComposer: 'Ludwig van Beethoven', type: 'Western/Classical', keyOrRaga: 'C Major', tempoBpm: 60 },
          { title: 'Twinkle, Twinkle, Little Star', artistOrComposer: 'Traditional Classical', type: 'Western/Classical', keyOrRaga: 'C Major', tempoBpm: 65 },
          { title: 'Sa-Re-Ga-Ma Piano Keyboard Warmup', artistOrComposer: 'Bilahari / Bilawal', type: 'Indian/Hindi', keyOrRaga: 'C Major / Bilawal', tempoBpm: 60 },
        ],
        exercises: [
          {
            id: 'piano-t1-ex1',
            title: 'Middle C 5-Finger Pattern (RH & LH)',
            subtitle: '1-2-3-4-5 on C-D-E-F-G with curved knuckles and level wrists',
            durationMinutes: 8,
            difficulty: 1,
            goal: 'Play C-D-E-F-G-F-E-D-C with even tone and zero wrist collapse.',
            category: 'posture',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t1-1', name: 'C4', frequency: 261.63, durationMs: 1000, pianoKeyIndex: 40, finger: 1, startTimeMs: 0 },
              { id: 'p-t1-2', name: 'D4', frequency: 293.66, durationMs: 1000, pianoKeyIndex: 42, finger: 2, startTimeMs: 1000 },
              { id: 'p-t1-3', name: 'E4', frequency: 329.63, durationMs: 1000, pianoKeyIndex: 44, finger: 3, startTimeMs: 2000 },
              { id: 'p-t1-4', name: 'F4', frequency: 349.23, durationMs: 1000, pianoKeyIndex: 45, finger: 4, startTimeMs: 3000 },
              { id: 'p-t1-5', name: 'G4', frequency: 392.00, durationMs: 2000, pianoKeyIndex: 47, finger: 5, startTimeMs: 4000 },
            ],
            postureGuidance: {
              ideal: 'Sit tall on front half of bench, forearms parallel to floor, curved fingers like holding a small apple.',
              commonMistakes: ['Collapsed wrist resting on keybed', 'Flat fingers causing tension', 'Raised shoulders'],
              correctiveTip: 'Lift wrist slightly so it forms a gentle downward slope toward the key tops.'
            }
          },
          {
            id: 'piano-t1-ex2',
            title: 'Ode to Joy (Right Hand Melody + Quarter Notes)',
            subtitle: 'Smooth weight transfer across fingers 3, 4, 5, 2, 1',
            durationMinutes: 10,
            difficulty: 1,
            goal: 'Play Beethoven theme steadily at 60 BPM with clear quarter-note articulation.',
            category: 'repertoire',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t1-6', name: 'E4', frequency: 329.63, durationMs: 1000, pianoKeyIndex: 44, finger: 3, startTimeMs: 0 },
              { id: 'p-t1-7', name: 'E4', frequency: 329.63, durationMs: 1000, pianoKeyIndex: 44, finger: 3, startTimeMs: 1000 },
              { id: 'p-t1-8', name: 'F4', frequency: 349.23, durationMs: 1000, pianoKeyIndex: 45, finger: 4, startTimeMs: 2000 },
              { id: 'p-t1-9', name: 'G4', frequency: 392.00, durationMs: 1000, pianoKeyIndex: 47, finger: 5, startTimeMs: 3000 },
              { id: 'p-t1-10', name: 'G4', frequency: 392.00, durationMs: 1000, pianoKeyIndex: 47, finger: 5, startTimeMs: 4000 },
              { id: 'p-t1-11', name: 'F4', frequency: 349.23, durationMs: 1000, pianoKeyIndex: 45, finger: 4, startTimeMs: 5000 },
              { id: 'p-t1-12', name: 'E4', frequency: 329.63, durationMs: 1000, pianoKeyIndex: 44, finger: 3, startTimeMs: 6000 },
              { id: 'p-t1-13', name: 'D4', frequency: 293.66, durationMs: 2000, pianoKeyIndex: 42, finger: 2, startTimeMs: 7000 },
            ],
            postureGuidance: {
              ideal: 'Arm weight transfers fluidly from finger to finger without pressing from isolated tendons.',
              commonMistakes: ['Hammering keys with tense fingertips', 'Dropping elbow below bench line'],
              correctiveTip: 'Keep elbows relaxed and gently spaced from your torso.'
            }
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Tier 2: Early Intermediate',
        tierName: 'Early Intermediate',
        durationSpan: 'Months 2–6',
        dailyPracticeMinutes: '45–60 min/day',
        focusSummary: 'Two-hand coordination, primary triad chords (C, G, F major), melodic playing, dynamic touch control.',
        outcome: 'Coordinate LH single-note / shell bass while RH plays melody; perform C, G, F triads smoothly.',
        accentColor: '#8067FF',
        requiredXp: 300,
        unlocked: true,
        completed: false,
        completionPercent: 50,
        dailyRoutine: [
          { activity: 'C Major one-octave scale (thumb under)', minutes: 10 },
          { activity: 'Triad chord progressions (C–F–G–C)', minutes: 15 },
          { activity: 'Two-hand coordination drills', minutes: 15 },
          { activity: 'Repertoire: Minuet in G / Let It Be', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Minuet in G (Petzold / Anna Magdalena)', artistOrComposer: 'Christian Petzold', type: 'Western/Classical', keyOrRaga: 'G Major', tempoBpm: 84 },
          { title: 'Let It Be (Chords & Melody)', artistOrComposer: 'The Beatles', type: 'Contemporary/Pop', keyOrRaga: 'C Major', tempoBpm: 72 },
          { title: 'Tera Ban Jaunga (Piano Intro)', artistOrComposer: 'Kabir Singh', type: 'Indian/Hindi', keyOrRaga: 'C–G–Em–D', tempoBpm: 68 },
        ],
        exercises: [
          {
            id: 'piano-t2-ex1',
            title: 'C Major Full Octave Scale (Thumb Pass-Under)',
            subtitle: '1-2-3-1-2-3-4-5 fingering with horizontal bridge stability',
            durationMinutes: 10,
            difficulty: 2,
            goal: 'Execute seamless thumb tuck under finger 3 without wrist popping upward.',
            category: 'technique',
            tempoBpm: 72,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t2-1', name: 'C4', frequency: 261.63, durationMs: 600, pianoKeyIndex: 40, finger: 1, startTimeMs: 0 },
              { id: 'p-t2-2', name: 'D4', frequency: 293.66, durationMs: 600, pianoKeyIndex: 42, finger: 2, startTimeMs: 600 },
              { id: 'p-t2-3', name: 'E4', frequency: 329.63, durationMs: 600, pianoKeyIndex: 44, finger: 3, startTimeMs: 1200 },
              { id: 'p-t2-4', name: 'F4', frequency: 349.23, durationMs: 600, pianoKeyIndex: 45, finger: 1, startTimeMs: 1800 },
              { id: 'p-t2-5', name: 'G4', frequency: 392.00, durationMs: 600, pianoKeyIndex: 47, finger: 2, startTimeMs: 2400 },
              { id: 'p-t2-6', name: 'A4', frequency: 440.00, durationMs: 600, pianoKeyIndex: 49, finger: 3, startTimeMs: 3000 },
              { id: 'p-t2-7', name: 'B4', frequency: 493.88, durationMs: 600, pianoKeyIndex: 51, finger: 4, startTimeMs: 3600 },
              { id: 'p-t2-8', name: 'C5', frequency: 523.25, durationMs: 1200, pianoKeyIndex: 52, finger: 5, startTimeMs: 4200 },
            ],
            postureGuidance: {
              ideal: 'Glide thumb smoothly under palm as finger 2 plays, maintaining level knuckle line.',
              commonMistakes: ['Jerking wrist upward when thumb crosses', 'Flying elbow outward'],
              correctiveTip: 'Prepare thumb early beneath palm before key F is struck.'
            }
          },
          {
            id: 'piano-t2-ex2',
            title: 'Primary Triads Progression: C - F - G - C',
            subtitle: 'Root position block chords with minimal hand displacement',
            durationMinutes: 12,
            difficulty: 2,
            goal: 'Transition between I, IV, V triads in time with 4-beat duration.',
            category: 'chords_triads',
            tempoBpm: 65,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t2-9', name: 'C4', frequency: 261.63, durationMs: 1500, pianoKeyIndex: 40, finger: 1, startTimeMs: 0 },
              { id: 'p-t2-10', name: 'F4', frequency: 349.23, durationMs: 1500, pianoKeyIndex: 45, finger: 3, startTimeMs: 1500 },
              { id: 'p-t2-11', name: 'G4', frequency: 392.00, durationMs: 1500, pianoKeyIndex: 47, finger: 5, startTimeMs: 3000 },
              { id: 'p-t2-12', name: 'C4', frequency: 261.63, durationMs: 2000, pianoKeyIndex: 40, finger: 1, startTimeMs: 4500 },
            ],
            postureGuidance: {
              ideal: 'Drop hand from wrist into keys with unified arm weight.',
              commonMistakes: ['Stiff fingers poking keys individually', 'Uneven triad note release'],
              correctiveTip: 'Keep thumb, middle, and pinky locked in triad shape as you drop.'
            }
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Tier 3: Intermediate',
        tierName: 'Intermediate',
        durationSpan: 'Months 6–18',
        dailyPracticeMinutes: '60–90 min/day',
        focusSummary: 'Minor key signatures, chord inversions, arpeggio patterns, treble and bass clef sight-reading.',
        outcome: 'Perform 2-octave hands-together minor scales, fluent triad inversions, and Bach inventions.',
        accentColor: '#8067FF',
        requiredXp: 800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: '2-octave A minor & D minor scales', minutes: 15 },
          { activity: 'Triad inversions (Root → 1st → 2nd)', minutes: 15 },
          { activity: 'Hanon 1–5 finger independence drills', minutes: 15 },
          { activity: 'Repertoire: Für Elise / Bach Invention 1', minutes: 25 },
        ],
        repertoireMilestones: [
          { title: 'Für Elise (Poetic Theme)', artistOrComposer: 'Ludwig van Beethoven', type: 'Western/Classical', keyOrRaga: 'A Minor', tempoBpm: 66 },
          { title: 'Bach Invention No. 1 in C Major', artistOrComposer: 'J.S. Bach (BWV 772)', type: 'Western/Classical', keyOrRaga: 'C Major', tempoBpm: 76 },
          { title: 'Tum Hi Ho (Arpeggiated Ballad)', artistOrComposer: 'Arijit Singh / Mithoon', type: 'Indian/Hindi', keyOrRaga: 'Em–C–G–D', tempoBpm: 64 },
        ],
        exercises: [
          {
            id: 'piano-t3-ex1',
            title: 'Triad Inversions: C Major (Root, 1st, 2nd)',
            subtitle: 'C-E-G -> E-G-C -> G-C-E voice leading transitions',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Shift through inversions with minimal horizontal hand leap.',
            category: 'chords_triads',
            tempoBpm: 70,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t3-1', name: 'C4', frequency: 261.63, durationMs: 1000, pianoKeyIndex: 40, finger: 1, startTimeMs: 0 },
              { id: 'p-t3-2', name: 'E4', frequency: 329.63, durationMs: 1000, pianoKeyIndex: 44, finger: 2, startTimeMs: 1000 },
              { id: 'p-t3-3', name: 'G4', frequency: 392.00, durationMs: 1000, pianoKeyIndex: 47, finger: 3, startTimeMs: 2000 },
              { id: 'p-t3-4', name: 'C5', frequency: 523.25, durationMs: 1500, pianoKeyIndex: 52, finger: 5, startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Cushion hand arrival with flexible wrists like landing on springs.',
              commonMistakes: ['Rigid forearm clamping', 'Looking back and forth frantically between keys'],
              correctiveTip: 'Feel the topography of the black keys with your peripheral fingers.'
            }
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Tier 4: Advanced',
        tierName: 'Advanced',
        durationSpan: 'Years 2–4',
        dailyPracticeMinutes: '90–120 min/day',
        focusSummary: 'Seventh chords, complex time signatures (6/8, 7/8, 5/4), sustain pedal techniques, classical and modern repertoire.',
        outcome: 'Perform Chopin Nocturnes with lyrical rubato and execute jazz 2-5-1 chord voicings.',
        accentColor: '#8067FF',
        requiredXp: 1600,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Seventh chord arpeggios (Maj7, Dom7, m7)', minutes: 20 },
          { activity: 'Damper pedal syncopated change drill', minutes: 20 },
          { activity: 'Polyrhythms: 3-against-2 in 6/8 and 7/8', minutes: 25 },
          { activity: 'Repertoire: Chopin Nocturne Op. 9 No. 2', minutes: 35 },
        ],
        repertoireMilestones: [
          { title: 'Nocturne Op. 9 No. 2 in E-flat Major', artistOrComposer: 'Frédéric Chopin', type: 'Western/Classical', keyOrRaga: 'Eb Major', tempoBpm: 58 },
          { title: 'Clair de Lune (Impressionist Arpeggios)', artistOrComposer: 'Claude Debussy', type: 'Western/Classical', keyOrRaga: 'Db Major', tempoBpm: 52 },
          { title: 'Autumn Leaves (Jazz 2-5-1 Voicings)', artistOrComposer: 'Joseph Kosma', type: 'Contemporary/Pop', keyOrRaga: 'G Minor / Bb', tempoBpm: 88 },
        ],
        exercises: [
          {
            id: 'piano-t4-ex1',
            title: 'Jazz 2-5-1 Chord Progression & Damper Pedaling',
            subtitle: 'Dm7 -> G7 -> Cmaj7 smooth voice leading and clean pedal changes',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Coordinate clean syncopated pedaling without muddy harmonic bleed.',
            category: 'chords_triads',
            tempoBpm: 80,
            timeSignature: '4/4',
            keySignature: 'C Major',
            notes: [
              { id: 'p-t4-1', name: 'D4', frequency: 293.66, durationMs: 1200, pianoKeyIndex: 42, finger: 1, startTimeMs: 0 },
              { id: 'p-t4-2', name: 'F4', frequency: 349.23, durationMs: 1200, pianoKeyIndex: 45, finger: 2, startTimeMs: 1200 },
              { id: 'p-t4-3', name: 'B4', frequency: 493.88, durationMs: 1200, pianoKeyIndex: 51, finger: 4, startTimeMs: 2400 },
              { id: 'p-t4-4', name: 'E4', frequency: 329.63, durationMs: 2000, pianoKeyIndex: 44, finger: 3, startTimeMs: 3600 },
            ],
            postureGuidance: {
              ideal: 'Change sustain pedal immediately AFTER the new chord sounds, never before.',
              commonMistakes: ['Holding pedal across harmonic root shifts blurring dissonance', 'Heel lifting off floor'],
              correctiveTip: 'Keep heel firmly anchored; articulate pedal strictly from ankle hinge.'
            }
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Tier 5: Professional',
        tierName: 'Professional',
        durationSpan: 'Months 16+',
        dailyPracticeMinutes: '2–3 hours/day',
        focusSummary: 'Complex score sight-reading, advanced jazz/classical improvisation, rapid scale passages, studio performance mastery.',
        outcome: 'Perform Rachmaninoff concerto excerpts and improvise fluently across multi-octave altered scales.',
        accentColor: '#8067FF',
        requiredXp: 2800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Rapid 3-octave chromatic & double-note runs', minutes: 30 },
          { activity: 'Complex polyphonic fugue voicing (Bach WTC)', minutes: 40 },
          { activity: 'Free jazz/classical modal improvisation', minutes: 30 },
          { activity: 'Concert repertoire recording and critique', minutes: 40 },
        ],
        repertoireMilestones: [
          { title: 'Well-Tempered Clavier Prelude & Fugue in C Minor', artistOrComposer: 'J.S. Bach', type: 'Western/Classical', keyOrRaga: 'C Minor (BWV 847)', tempoBpm: 84 },
          { title: 'Rachmaninoff Prelude in C# Minor', artistOrComposer: 'Sergei Rachmaninoff', type: 'Western/Classical', keyOrRaga: 'C# Minor Op. 3', tempoBpm: 54 },
        ],
        exercises: [
          {
            id: 'piano-t5-ex1',
            title: 'Polyphonic Voicing: Three Voices Independence',
            subtitle: 'Sustain middle cantabile voice louder while outer accompaniments play pianissimo',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Execute three dynamic tiers simultaneously in one hand.',
            category: 'repertoire',
            tempoBpm: 66,
            timeSignature: '4/4',
            keySignature: 'C Minor',
            notes: [
              { id: 'p-t5-1', name: 'C4', frequency: 261.63, durationMs: 800, pianoKeyIndex: 40, finger: 1, startTimeMs: 0 },
              { id: 'p-t5-2', name: 'G4', frequency: 392.00, durationMs: 800, pianoKeyIndex: 47, finger: 5, startTimeMs: 800 },
              { id: 'p-t5-3', name: 'Eb4', frequency: 311.13, durationMs: 1600, pianoKeyIndex: 43, finger: 3, startTimeMs: 1600 },
            ],
            postureGuidance: {
              ideal: 'Weight leans toward finger 3 to give the cantabile melodic voice singing presence.',
              commonMistakes: ['Flat dynamics where all notes sound equally loud', 'Tense wrist preventing touch gradient'],
              correctiveTip: 'Transfer forearm gravity directly into the melodic finger.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // C. GUITAR
  // =========================================================================
  guitar: {
    instrument: 'guitar',
    displayName: 'Acoustic & Electric Guitar',
    tagline: 'Fretboard spatial mastery, arched fingertip clarity, and dynamic strumming rhythm',
    accentColor: '#FF8066',
    focusAreas: [
      'Posture, ergonomics & thumb alignment behind neck',
      'Open string tuning verification (E2-A2-D3-G3-B3-E4)',
      'Primary open chords (Em, Am, C, G, D, Maj7, E)',
      'Knuckle arch & fret wire proximity tracking',
      'Syncopated strumming (Down-Down-Up-Up-Down-Up)',
      'Minor Pentatonic Box 1 & alternate picking',
      'F-shape & B-shape movable barre chords',
      'Travis fingerstyle (P-I-M-A) & percussive palm muting',
      'CAGED system & top-3 string triad inversions',
      'Pitch bending accuracy & modal soloing (Dorian / Mixolydian)',
      'Sweeping, two-handed tapping & concert solo evaluation',
    ],
    levels: [
      // ---------------------------------------------------------------------
      // LEVEL 1: ABSOLUTE BEGINNER (FOUNDATIONS & OPEN CHORDS)
      // ---------------------------------------------------------------------
      {
        levelNumber: 1,
        title: 'Level 1: Absolute Beginner',
        tierName: 'Absolute Beginner',
        durationSpan: 'Weeks 1–4',
        dailyPracticeMinutes: '30–45 min/day',
        focusSummary: 'Posture & ergonomics, 6-string open tuning, right-hand downstroke rhythm, first chord triad (Em, Am, C), and 4-beat transitions.',
        outcome: 'Verify open string tuning via pitch tracking, hold guitar with proper thumb placement, and perform 8-bar strumming transitions between Em, Am, and C at 70 BPM.',
        accentColor: '#FF8066',
        requiredXp: 0,
        unlocked: true,
        completed: true,
        completionPercent: 100,
        dailyRoutine: [
          { activity: 'Seating posture & thumb position check', minutes: 5 },
          { activity: 'Open string tuning verification (E-A-D-G-B-E)', minutes: 5 },
          { activity: 'Downstroke quarter notes at 60 BPM', minutes: 10 },
          { activity: 'Chord arch & 4-beat switch: Em -> Am -> C', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Level 1 Boss: 8-Bar Open Strumming Track', artistOrComposer: 'VIBEX Rhythm Lab', type: 'Contemporary/Pop', keyOrRaga: 'E Minor / C Major', tempoBpm: 70 },
          { title: 'Horse with No Name (Em - D6)', artistOrComposer: 'America', type: 'Contemporary/Pop', keyOrRaga: 'E Minor', tempoBpm: 68 },
          { title: 'Tum Hi Ho (Simplified Em-C-G-D)', artistOrComposer: 'Aashiqui 2', type: 'Indian/Hindi', keyOrRaga: 'E Minor', tempoBpm: 66 },
        ],
        exercises: [
          {
            id: 'guitar-l1-ex1',
            title: 'Open String Tuning & Downstroke Quarter-Notes',
            subtitle: 'Module 1.1: E2-A2-D3-G3-B3-E4 pitch verification and 60 BPM downstroke rhythm',
            durationMinutes: 6,
            difficulty: 1,
            goal: 'Pluck each open string in tune and execute steady downstrokes on beats 1, 2, 3, 4.',
            category: 'technique',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'Standard Tuning (EADGBE)',
            notes: [
              { id: 'g-l1-1', name: 'E2', frequency: 82.41, durationMs: 1000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-l1-2', name: 'A2', frequency: 110.00, durationMs: 1000, fret: 0, stringIndex: 1, finger: 0, startTimeMs: 1000 },
              { id: 'g-l1-3', name: 'D3', frequency: 146.83, durationMs: 1000, fret: 0, stringIndex: 2, finger: 0, startTimeMs: 2000 },
              { id: 'g-l1-4', name: 'G3', frequency: 196.00, durationMs: 1000, fret: 0, stringIndex: 3, finger: 0, startTimeMs: 3000 },
              { id: 'g-l1-5', name: 'B3', frequency: 246.94, durationMs: 1000, fret: 0, stringIndex: 4, finger: 0, startTimeMs: 4000 },
              { id: 'g-l1-6', name: 'E4', frequency: 329.63, durationMs: 1000, fret: 0, stringIndex: 5, finger: 0, startTimeMs: 5000 },
            ],
            postureGuidance: {
              ideal: 'Sit upright, guitar body on leg with neck angled slightly upward (~30 degrees). Thumb centered behind neck.',
              commonMistakes: ['Thumb wrapping over neck and tilting palm flat', 'Slouching over soundboard'],
              correctiveTip: 'Keep thumb pad lightly on the centerline of the neck; keep wrist straight.'
            }
          },
          {
            id: 'guitar-l1-ex2',
            title: 'First Open Chord Triad: Em, Am, and C Major',
            subtitle: 'Module 1.2: Knuckle arch check & 4-beat transitions (Em -> Am -> C -> Em)',
            durationMinutes: 10,
            difficulty: 1,
            goal: 'Form Em, Am, and C with arched knuckles and switch chords cleanly on beat 1.',
            category: 'chords_triads',
            tempoBpm: 65,
            timeSignature: '4/4',
            keySignature: 'E Minor / C Major',
            notes: [
              { id: 'g-l1-7', name: 'Em Chord (E2-B2-E3-G3)', frequency: 82.41, durationMs: 2000, fret: 2, stringIndex: 1, finger: 2, startTimeMs: 0 },
              { id: 'g-l1-8', name: 'Am Chord (A2-E3-A3-C4)', frequency: 110.00, durationMs: 2000, fret: 1, stringIndex: 4, finger: 1, startTimeMs: 2000 },
              { id: 'g-l1-9', name: 'C Major (C3-E3-G3-C4)', frequency: 130.81, durationMs: 2000, fret: 3, stringIndex: 1, finger: 3, startTimeMs: 4000 },
              { id: 'g-l1-10', name: 'Em Resolution', frequency: 82.41, durationMs: 2000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 6000 },
            ],
            postureGuidance: {
              ideal: 'Proximal and distal knuckles arched like a claw. Fingertips press perpendicularly right behind frets.',
              commonMistakes: ['Flat finger pads muting adjacent open strings', 'Pinky flying far away in tension'],
              correctiveTip: 'Arch index and middle fingers so the high E and B strings ring completely unobstructed.'
            }
          },
          {
            id: 'guitar-l1-boss',
            title: 'Practice Node 1 Boss: 8-Bar Open Chord Strum Track',
            subtitle: 'Module 1.3: Continuous rhythm performance of Em, Am, and C at 70 BPM',
            durationMinutes: 12,
            difficulty: 2,
            goal: 'Perform complete 8-bar rhythm without stopping or missing chord downbeats.',
            category: 'repertoire',
            tempoBpm: 70,
            timeSignature: '4/4',
            keySignature: 'E Minor',
            notes: [
              { id: 'g-l1-b1', name: 'Em (Bar 1-2)', frequency: 82.41, durationMs: 4000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-l1-b2', name: 'Am (Bar 3-4)', frequency: 110.00, durationMs: 4000, fret: 1, stringIndex: 4, finger: 1, startTimeMs: 4000 },
              { id: 'g-l1-b3', name: 'C (Bar 5-6)', frequency: 130.81, durationMs: 4000, fret: 3, stringIndex: 1, finger: 3, startTimeMs: 8000 },
              { id: 'g-l1-b4', name: 'Em Final (Bar 7-8)', frequency: 82.41, durationMs: 4000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 12000 },
            ],
            postureGuidance: {
              ideal: 'Loose pendulum strumming wrist motion from forearm; left hand anchors effortlessly.',
              commonMistakes: ['Stiff elbow driving the strum instead of relaxed wrist', 'Hesitating during chord change'],
              correctiveTip: 'Keep right hand strumming like a continuous pendulum even while left hand pivots.'
            }
          }
        ]
      },

      // ---------------------------------------------------------------------
      // LEVEL 2: EARLY INTERMEDIATE (CHORD EXPANSION & PENTATONICS)
      // ---------------------------------------------------------------------
      {
        levelNumber: 2,
        title: 'Level 2: Early Intermediate',
        tierName: 'Early Intermediate',
        durationSpan: 'Months 2–4',
        dailyPracticeMinutes: '45–60 min/day',
        focusSummary: 'Open chord expansion (G, D, Maj7, E), syncopated "Down-Down-Up-Up-Down-Up" strumming, Minor Pentatonic Box 1, and hammer-ons/pull-offs.',
        outcome: 'Master syncopated strumming patterns, alternate-pick the E Minor Pentatonic scale, and play expressive hammer-on / pull-off licks.',
        accentColor: '#FF8066',
        requiredXp: 300,
        unlocked: true,
        completed: false,
        completionPercent: 40,
        dailyRoutine: [
          { activity: 'Syncopated D-D-U-U-D-U pattern with muted strings', minutes: 10 },
          { activity: 'Chord switch drills (G - D - Maj7 - E)', minutes: 12 },
          { activity: 'Minor Pentatonic Box 1 alternate picking', minutes: 13 },
          { activity: 'Hammer-on & pull-off articulation on strings 1-3', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Level 2 Boss: 12-Bar Rhythm & Pentatonic Box 1 Run', artistOrComposer: 'VIBEX Blues Lab', type: 'Contemporary/Pop', keyOrRaga: 'E Minor / Blues', tempoBpm: 80 },
          { title: 'Knockin on Heavens Door', artistOrComposer: 'Bob Dylan', type: 'Contemporary/Pop', keyOrRaga: 'G - D - Am / C', tempoBpm: 68 },
          { title: 'Wish You Were Here (Acoustic Intro)', artistOrComposer: 'Pink Floyd', type: 'Western/Classical', keyOrRaga: 'G Major', tempoBpm: 60 },
        ],
        exercises: [
          {
            id: 'guitar-l2-ex1',
            title: 'Open Chord Expansion & Syncopated Strumming',
            subtitle: 'Module 2.1: G, D, Maj7, and E with "Down-Down-Up-Up-Down-Up" pattern',
            durationMinutes: 10,
            difficulty: 2,
            goal: 'Execute syncopated strum pattern smoothly while transitioning across G, D, and E Major.',
            category: 'chords_triads',
            tempoBpm: 75,
            timeSignature: '4/4',
            keySignature: 'G Major / D Major',
            notes: [
              { id: 'g-l2-1', name: 'G Major', frequency: 98.00, durationMs: 2000, fret: 3, stringIndex: 0, finger: 2, startTimeMs: 0 },
              { id: 'g-l2-2', name: 'D Major', frequency: 146.83, durationMs: 2000, fret: 2, stringIndex: 3, finger: 1, startTimeMs: 2000 },
              { id: 'g-l2-3', name: 'C Maj7', frequency: 130.81, durationMs: 2000, fret: 2, stringIndex: 2, finger: 2, startTimeMs: 4000 },
              { id: 'g-l2-4', name: 'E Major', frequency: 82.41, durationMs: 2000, fret: 1, stringIndex: 3, finger: 1, startTimeMs: 6000 },
            ],
            postureGuidance: {
              ideal: 'Fret hand ring finger stays close to fret 3 as common pivot point between G and D.',
              commonMistakes: ['Stopping right hand strumming on the "and" of beat 2', 'Hitting 6th string on D major chord'],
              correctiveTip: 'Thumb should rest lightly touching the edge of 6th string to mute it on D major.'
            }
          },
          {
            id: 'guitar-l2-ex2',
            title: 'Minor Pentatonic Scale (Box 1) & Alternate Picking',
            subtitle: 'Module 2.2: Root E Box 1 shape with Down-Up pick direction and fret proximity',
            durationMinutes: 10,
            difficulty: 2,
            goal: 'Alternate pick all 12 notes of Pentatonic Box 1 ascending and descending at 80 BPM.',
            category: 'scales_alankars',
            tempoBpm: 80,
            timeSignature: '4/4',
            keySignature: 'E Minor Pentatonic',
            notes: [
              { id: 'g-l2-5', name: 'E2', frequency: 82.41, durationMs: 500, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-l2-6', name: 'G2', frequency: 98.00, durationMs: 500, fret: 3, stringIndex: 0, finger: 3, startTimeMs: 500 },
              { id: 'g-l2-7', name: 'A2', frequency: 110.00, durationMs: 500, fret: 0, stringIndex: 1, finger: 0, startTimeMs: 1000 },
              { id: 'g-l2-8', name: 'B2', frequency: 123.47, durationMs: 500, fret: 2, stringIndex: 1, finger: 2, startTimeMs: 1500 },
              { id: 'g-l2-9', name: 'D3', frequency: 146.83, durationMs: 500, fret: 0, stringIndex: 2, finger: 0, startTimeMs: 2000 },
              { id: 'g-l2-10', name: 'E3', frequency: 164.81, durationMs: 500, fret: 2, stringIndex: 2, finger: 2, startTimeMs: 2500 },
            ],
            postureGuidance: {
              ideal: 'Pick strokes strictly alternate (Down, Up, Down, Up). Fretting fingers hover directly over their respective frets.',
              commonMistakes: ['Flying fingers lifting more than 1 inch off the fretboard', 'All downstrokes with pick'],
              correctiveTip: 'Keep picking hand relaxed at the wrist; motion should be small and economical.'
            }
          },
          {
            id: 'guitar-l2-boss',
            title: 'Practice Node 2 Boss: 12-Bar Rhythm & Box 1 Pentatonic Lead Run',
            subtitle: 'Module 2.3: Expressive hammer-ons, pull-offs, and continuous 12-bar blues performance',
            durationMinutes: 14,
            difficulty: 3,
            goal: 'Perform continuous 12-bar syncopated rhythm followed by an expressive Box 1 solo run.',
            category: 'repertoire',
            tempoBpm: 85,
            timeSignature: '4/4',
            keySignature: 'E Minor / Blues',
            notes: [
              { id: 'g-l2-b1', name: 'E5 Power Strum', frequency: 82.41, durationMs: 2000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-l2-b2', name: 'Hammer-on D to E', frequency: 164.81, durationMs: 1000, fret: 2, stringIndex: 2, finger: 2, startTimeMs: 2000 },
              { id: 'g-l2-b3', name: 'Pull-off G to E', frequency: 164.81, durationMs: 1000, fret: 0, stringIndex: 2, finger: 0, startTimeMs: 3000 },
              { id: 'g-l2-b4', name: 'E Minor Pentatonic Peak', frequency: 329.63, durationMs: 2000, fret: 0, stringIndex: 5, finger: 0, startTimeMs: 4000 },
            ],
            postureGuidance: {
              ideal: 'Snap finger firmly onto fretboard for hammer-on without strumming; flick string downward for pull-off.',
              commonMistakes: ['Weak hammer-on producing inaudible second note', 'Pull-off displacing neighboring string'],
              correctiveTip: 'Use the tip of finger 2 to hammer with percussive authority directly behind fret wire 2.'
            }
          }
        ]
      },

      // ---------------------------------------------------------------------
      // LEVEL 3: INTERMEDIATE (BARRE CHORDS & FINGERSTYLE)
      // ---------------------------------------------------------------------
      {
        levelNumber: 3,
        title: 'Level 3: Intermediate',
        tierName: 'Intermediate',
        durationSpan: 'Months 5–8',
        dailyPracticeMinutes: '60–90 min/day',
        focusSummary: 'F-shape & B-shape barre chords, index finger barre pressure, P-I-M-A fingerpicking, palm muting, and triad ear training.',
        outcome: 'Cleanly ring all 6 strings on full barre chords, execute Travis picking and bridge palm muting, and identify major vs minor chord triads.',
        accentColor: '#FF8066',
        requiredXp: 750,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Index finger barre clamping drill at frets 1, 3, 5', minutes: 15 },
          { activity: 'F Major and B Minor movable chord shapes', minutes: 20 },
          { activity: 'P-I-M-A Travis fingerpicking on open & barre chords', minutes: 20 },
          { activity: 'Palm muting rhythmic bassline exercises', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Level 3 Boss: Fingerstyle Accompaniment with Barre Transitions', artistOrComposer: 'VIBEX Studio Sessions', type: 'Western/Classical', keyOrRaga: 'B Minor / D Major', tempoBpm: 75 },
          { title: 'Hotel California (Acoustic Intro Arpeggios)', artistOrComposer: 'Eagles', type: 'Contemporary/Pop', keyOrRaga: 'B Minor', tempoBpm: 75 },
          { title: 'Ae Dil Hai Mushkil (Barre Chord Dynamics)', artistOrComposer: 'Arijit Singh / Pritam', type: 'Indian/Hindi', keyOrRaga: 'C#m - A - E - B', tempoBpm: 82 },
        ],
        exercises: [
          {
            id: 'guitar-l3-ex1',
            title: 'F-Shape & B-Shape Barre Chord Alignment',
            subtitle: 'Module 3.1: Even index pressure across 6 strings with wrist arch validation',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Barre across fret 1 (F) and fret 2 (Bm) with zero muted strings and correct wrist alignment.',
            category: 'chords_triads',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'F Major / B Minor',
            notes: [
              { id: 'g-l3-1', name: 'F1 (Barre Bass)', frequency: 87.31, durationMs: 1500, fret: 1, stringIndex: 0, finger: 1, startTimeMs: 0 },
              { id: 'g-l3-2', name: 'C3 (5th String)', frequency: 130.81, durationMs: 1500, fret: 3, stringIndex: 1, finger: 3, startTimeMs: 1500 },
              { id: 'g-l3-3', name: 'F3 (4th String)', frequency: 174.61, durationMs: 1500, fret: 3, stringIndex: 2, finger: 4, startTimeMs: 3000 },
              { id: 'g-l3-4', name: 'A3 (3rd String)', frequency: 220.00, durationMs: 1500, fret: 2, stringIndex: 3, finger: 2, startTimeMs: 4500 },
            ],
            postureGuidance: {
              ideal: 'Index finger rotated slightly on its bony outer edge, parallel to fret wire. Wrist dropped slightly below neck.',
              commonMistakes: ['Bending wrist at an extreme sharp angle causing tendon strain', 'Soft fleshy pad failing to barre string 2'],
              correctiveTip: 'Pull left elbow gently backward to use back muscle leverage rather than solely thumb pinch.'
            }
          },
          {
            id: 'guitar-l3-ex2',
            title: 'Travis Fingerstyle (P-I-M-A) & Bridge Palm Muting',
            subtitle: 'Module 3.2: Alternating bass thumb with treble finger rolls and fleshy percussive mute',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Maintain continuous thumb bass alternation while index, middle, and ring pluck syncopated melodies.',
            category: 'technique',
            tempoBpm: 75,
            timeSignature: '4/4',
            keySignature: 'G Major / E Minor',
            notes: [
              { id: 'g-l3-5', name: 'P (Thumb Bass G)', frequency: 98.00, durationMs: 500, fret: 3, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-l3-6', name: 'M (Middle String 2)', frequency: 246.94, durationMs: 500, fret: 0, stringIndex: 4, finger: 2, startTimeMs: 500 },
              { id: 'g-l3-7', name: 'P (Thumb Bass D)', frequency: 146.83, durationMs: 500, fret: 0, stringIndex: 2, finger: 0, startTimeMs: 1000 },
              { id: 'g-l3-8', name: 'I (Index String 3)', frequency: 196.00, durationMs: 500, fret: 0, stringIndex: 3, finger: 1, startTimeMs: 1500 },
            ],
            postureGuidance: {
              ideal: 'Right hand arched naturally above strings; outer edge of palm resting gently near bridge saddles for muting.',
              commonMistakes: ['Plucking strings upward away from guitar rather than brushing across', 'Resting entire hand on soundboard'],
              correctiveTip: 'Keep right thumb positioned forward of the fingers so thumb and index never collide.'
            }
          },
          {
            id: 'guitar-l3-boss',
            title: 'Practice Node 3 Boss: Fingerstyle Song Accompaniment with Barre Transitions',
            subtitle: 'Module 3.3: Dynamic fingerpicking with rapid F Major & B Minor barre transitions',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Perform complete fingerstyle accompaniment with clean barre switches and dynamic touch.',
            category: 'repertoire',
            tempoBpm: 80,
            timeSignature: '4/4',
            keySignature: 'B Minor',
            notes: [
              { id: 'g-l3-b1', name: 'Bm Barre Pattern', frequency: 123.47, durationMs: 2000, fret: 2, stringIndex: 1, finger: 1, startTimeMs: 0 },
              { id: 'g-l3-b2', name: 'G Major Travis Roll', frequency: 98.00, durationMs: 2000, fret: 3, stringIndex: 0, finger: 2, startTimeMs: 2000 },
              { id: 'g-l3-b3', name: 'F# Major Barre Tension', frequency: 92.50, durationMs: 2000, fret: 2, stringIndex: 0, finger: 1, startTimeMs: 4000 },
              { id: 'g-l3-b4', name: 'Bm Final Resolution', frequency: 123.47, durationMs: 2000, fret: 2, stringIndex: 1, finger: 1, startTimeMs: 6000 },
            ],
            postureGuidance: {
              ideal: 'Effortless transition between open chords and barre clamping; steady breathing rhythm.',
              commonMistakes: ['Squeezing neck during barre chord transitions causing fatigue', 'Rushing tempo during fingerstyle'],
              correctiveTip: 'Release barre clamp completely 1 sixteenth note before shifting; re-clamp cleanly on downbeat.'
            }
          }
        ]
      },

      // ---------------------------------------------------------------------
      // LEVEL 4: ADVANCED (MODES, EXPRESSION & SPEED)
      // ---------------------------------------------------------------------
      {
        levelNumber: 4,
        title: 'Level 4: Advanced',
        tierName: 'Advanced',
        durationSpan: 'Months 9–15',
        dailyPracticeMinutes: '90–120 min/day',
        focusSummary: 'CAGED system fretboard mapping, top-3 string triad inversions, whole-step pitch bending with DSP verification, vibrato, and modal soloing.',
        outcome: 'Navigate all 5 CAGED shapes across the neck, bend strings exactly to pitch with DSP confirmation, and improvise over Dorian / Mixolydian modes.',
        accentColor: '#FF8066',
        requiredXp: 1500,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'CAGED shape navigation across 12 frets', minutes: 20 },
          { activity: 'Triad inversions on strings 1, 2, and 3', minutes: 20 },
          { activity: 'Pitch bending graph verification (whole-step & half-step)', minutes: 25 },
          { activity: 'Dorian & Mixolydian lead improvisation over backing track', minutes: 25 },
        ],
        repertoireMilestones: [
          { title: 'Level 4 Boss: High-Tempo Lead Solo with Bends & Modal Runs', artistOrComposer: 'VIBEX Virtuoso Series', type: 'Contemporary/Pop', keyOrRaga: 'A Dorian / E Minor', tempoBpm: 110 },
          { title: 'Sweet Child O Mine (Solo & Bends)', artistOrComposer: 'Guns N Roses', type: 'Contemporary/Pop', keyOrRaga: 'D Major / E Minor', tempoBpm: 125 },
          { title: 'Nadaan Parindey (Full Lead Solo)', artistOrComposer: 'A.R. Rahman / Mohit Chauhan', type: 'Indian/Hindi', keyOrRaga: 'E Minor / Dorian', tempoBpm: 92 },
        ],
        exercises: [
          {
            id: 'guitar-l4-ex1',
            title: 'CAGED System & Top-3 String Triad Inversions',
            subtitle: 'Module 4.1: Mapping C-A-G-E-D chords and root, 1st, 2nd inversions on strings 1-2-3',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Connect major and minor triads smoothly up the fretboard across strings 1, 2, and 3.',
            category: 'chords_triads',
            tempoBpm: 90,
            timeSignature: '4/4',
            keySignature: 'D Major / A Major',
            notes: [
              { id: 'g-l4-1', name: 'D Root Triad (F#4-A4-D5)', frequency: 369.99, durationMs: 1000, fret: 2, stringIndex: 5, finger: 1, startTimeMs: 0 },
              { id: 'g-l4-2', name: 'D 1st Inversion (A4-D5-F#5)', frequency: 440.00, durationMs: 1000, fret: 5, stringIndex: 5, finger: 2, startTimeMs: 1000 },
              { id: 'g-l4-3', name: 'D 2nd Inversion (D5-F#5-A5)', frequency: 587.33, durationMs: 1000, fret: 10, stringIndex: 5, finger: 3, startTimeMs: 2000 },
            ],
            postureGuidance: {
              ideal: 'Hand glides smoothly between fret positions with thumb sliding along the neck groove.',
              commonMistakes: ['Anchoring thumb stubbornly in one fret pocket causing wrist stretch', 'Muting string 1 on high inversions'],
              correctiveTip: 'Let the thumb travel along the center spine of the guitar neck parallel to left hand movement.'
            }
          },
          {
            id: 'guitar-l4-ex2',
            title: 'Precision Whole-Step Pitch Bending & Sustained Vibrato',
            subtitle: 'Module 4.2: Bend 7th fret (G) to match 9th fret (A) verified via real-time pitch cents graph',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Bend string exactly 200 cents (whole step) to target frequency and sustain with even vibrato.',
            category: 'technique',
            tempoBpm: 80,
            timeSignature: '4/4',
            keySignature: 'A Minor Lead',
            notes: [
              { id: 'g-l4-4', name: 'D4 Natural Note (Fret 7)', frequency: 293.66, durationMs: 1000, fret: 7, stringIndex: 2, finger: 3, startTimeMs: 0 },
              { id: 'g-l4-5', name: 'E4 Whole Step Bend (Target)', frequency: 329.63, durationMs: 2000, fret: 7, stringIndex: 2, finger: 3, startTimeMs: 1000 },
              { id: 'g-l4-6', name: 'A4 High String Bend', frequency: 440.00, durationMs: 2000, fret: 8, stringIndex: 4, finger: 3, startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Use fingers 1, 2, and 3 together behind the bending finger for mechanical support. Rotate forearm from wrist.',
              commonMistakes: ['Bending with a single finger causing pitch flatting and slippage', 'Under-bending pitch by 30-50 cents'],
              correctiveTip: 'Drive the bend using forearm rotation like turning a doorknob, keeping fingers 1 & 2 locked to reinforce finger 3.'
            }
          },
          {
            id: 'guitar-l4-boss',
            title: 'Practice Node 4 Boss: High-Tempo Lead Solo with Bends & Modal Runs',
            subtitle: 'Module 4.3: Dorian & Mixolydian runs, fast legato phrasing, and whole-step bends at 110 BPM',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Complete full high-tempo lead track hitting every target pitch bend within +/- 15 cents.',
            category: 'repertoire',
            tempoBpm: 110,
            timeSignature: '4/4',
            keySignature: 'A Dorian',
            notes: [
              { id: 'g-l4-b1', name: 'Dorian Ascending Run', frequency: 440.00, durationMs: 500, fret: 5, stringIndex: 5, finger: 1, startTimeMs: 0 },
              { id: 'g-l4-b2', name: 'High Bend to E5', frequency: 659.25, durationMs: 1500, fret: 12, stringIndex: 5, finger: 3, startTimeMs: 500 },
              { id: 'g-l4-b3', name: 'Mixolydian Flatted 7th Lick', frequency: 587.33, durationMs: 1000, fret: 10, stringIndex: 4, finger: 1, startTimeMs: 2000 },
              { id: 'g-l4-b4', name: 'Vibrato Sustain Ending', frequency: 440.00, durationMs: 2000, fret: 5, stringIndex: 5, finger: 1, startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'High concert stage posture; neck elevated 40 degrees for effortless access past fret 12.',
              commonMistakes: ['Tense shoulders causing rapid fatigue at high tempos', 'Inconsistent vibrato pulse rate'],
              correctiveTip: 'Keep thumb resting gently behind fret 10; relax the jaw and breathe evenly during fast passages.'
            }
          }
        ]
      },

      // ---------------------------------------------------------------------
      // LEVEL 5: PROFESSIONAL (MASTERY, SWEEPING & PERFORMANCE)
      // ---------------------------------------------------------------------
      {
        levelNumber: 5,
        title: 'Level 5: Professional',
        tierName: 'Professional',
        durationSpan: 'Months 16+',
        dailyPracticeMinutes: '2–3 hours/day',
        focusSummary: '3-string & 5-string sweep arpeggios, two-handed fretboard tapping, extended voicings (Maj9, Min11, Altered Dominants), and key-modulating concert solos.',
        outcome: 'Execute fluid sweep arpeggios at 120+ BPM, tap polyphonic lines across the fingerboard, and deliver complete concert solos with real-time pose and pitch evaluation.',
        accentColor: '#FF8066',
        requiredXp: 3000,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: '3-string and 5-string sweep picking routines', minutes: 30 },
          { activity: 'Two-handed fretboard tapping & tap harmonics', minutes: 25 },
          { activity: 'Modern chord voicings: Maj9, Min11, Altered Dominants', minutes: 25 },
          { activity: 'Dynamic key-modulating concert solo performance', minutes: 40 },
        ],
        repertoireMilestones: [
          { title: 'Level 5 Boss: Full Concert Solo Performance Evaluation', artistOrComposer: 'VIBEX Concert Stage', type: 'Contemporary/Pop', keyOrRaga: 'Modulating (Em - G - Dm - Am)', tempoBpm: 120 },
          { title: 'Cliffs of Dover (Hybrid Picking & Fast Pentatonics)', artistOrComposer: 'Eric Johnson', type: 'Contemporary/Pop', keyOrRaga: 'G Major', tempoBpm: 140 },
          { title: 'Sufi & Indian Classical Fusion Raga Solo', artistOrComposer: 'Rockstar / Fusion Style', type: 'Indian/Hindi', keyOrRaga: 'Raag Bhairav Guitar Arrangement', tempoBpm: 95 },
        ],
        exercises: [
          {
            id: 'guitar-l5-ex1',
            title: '3-String & 5-String Sweep Arpeggios and Two-Hand Tapping',
            subtitle: 'Module 5.1: Synchronized single-motion pick rake with instantaneous finger release',
            durationMinutes: 20,
            difficulty: 5,
            goal: 'Perform 5-string Major and Minor sweep arpeggios cleanly at 120 BPM with zero string ringing.',
            category: 'technique',
            tempoBpm: 120,
            timeSignature: '4/4',
            keySignature: 'A Minor / C Major Arpeggios',
            notes: [
              { id: 'g-l5-1', name: 'A2 Sweep Root (Fret 12)', frequency: 110.00, durationMs: 250, fret: 12, stringIndex: 1, finger: 1, startTimeMs: 0 },
              { id: 'g-l5-2', name: 'E3 Sweep 5th (Fret 14)', frequency: 164.81, durationMs: 250, fret: 14, stringIndex: 2, finger: 3, startTimeMs: 250 },
              { id: 'g-l5-3', name: 'A3 Sweep Octave (Fret 14)', frequency: 220.00, durationMs: 250, fret: 14, stringIndex: 3, finger: 3, startTimeMs: 500 },
              { id: 'g-l5-4', name: 'C4 Sweep Minor 3rd (Fret 13)', frequency: 261.63, durationMs: 250, fret: 13, stringIndex: 4, finger: 2, startTimeMs: 750 },
              { id: 'g-l5-5', name: 'E4 Sweep High (Fret 12)', frequency: 329.63, durationMs: 250, fret: 12, stringIndex: 5, finger: 1, startTimeMs: 1000 },
              { id: 'g-l5-6', name: 'A4 Tap High Apex (Fret 17)', frequency: 440.00, durationMs: 500, fret: 17, stringIndex: 5, finger: 0, startTimeMs: 1250 },
            ],
            postureGuidance: {
              ideal: 'Pick glides across strings in one uninterrupted continuous sweep; fretting fingers lift the microsecond note sounds to eliminate sympathetic resonance.',
              commonMistakes: ['Strumming all strings into a chord rather than sequential single-note sweeps', 'Excessive pick depth catching strings'],
              correctiveTip: 'Angle pick 15 degrees downward; use the right hand edge to gently damp lower strings during the sweep.'
            }
          },
          {
            id: 'guitar-l5-ex2',
            title: 'Dynamic Modern Voicings: Maj9, Min11, and Altered Dominants',
            subtitle: 'Module 5.1: Harmonic richness with wide intervals and dissonant colorations',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Voice extended jazz/fusion chords with clean string separation and voice leading.',
            category: 'chords_triads',
            tempoBpm: 90,
            timeSignature: '4/4',
            keySignature: 'Jazz/Fusion Progressions',
            notes: [
              { id: 'g-l5-7', name: 'C Maj9 Voicing', frequency: 130.81, durationMs: 2000, fret: 3, stringIndex: 1, finger: 1, startTimeMs: 0 },
              { id: 'g-l5-8', name: 'D Min11 Voicing', frequency: 146.83, durationMs: 2000, fret: 5, stringIndex: 1, finger: 1, startTimeMs: 2000 },
              { id: 'g-l5-9', name: 'G7 Altered (b9#9#11)', frequency: 98.00, durationMs: 2000, fret: 3, stringIndex: 0, finger: 1, startTimeMs: 4000 },
            ],
            postureGuidance: {
              ideal: 'Wrist extended naturally with generous finger spread; thumb centered on back of neck.',
              commonMistakes: ['Tense palm gripping neck tightly preventing 4-fret stretch', 'Collapsing pinky knuckle on string 1'],
              correctiveTip: 'Keep neck angled upward; drop wrist slightly forward to allow fingers 3 and 4 to spread freely.'
            }
          },
          {
            id: 'guitar-l5-boss',
            title: 'Practice Node 5 Boss: Full Concert Solo Performance Evaluation',
            subtitle: 'Module 5.2: Complete multi-key solo performance evaluation with real-time pose and pitch scoring',
            durationMinutes: 25,
            difficulty: 5,
            goal: 'Deliver complete concert solo achieving >90% pitch intonation, tempo stability, and ergonomic posture.',
            category: 'repertoire',
            tempoBpm: 120,
            timeSignature: '4/4',
            keySignature: 'Modulating (E Minor -> A Dorian -> C Major)',
            notes: [
              { id: 'g-l5-b1', name: 'Em Intro Theme', frequency: 164.81, durationMs: 2000, fret: 2, stringIndex: 2, finger: 2, startTimeMs: 0 },
              { id: 'g-l5-b2', name: 'A Dorian Modulation Run', frequency: 440.00, durationMs: 2000, fret: 5, stringIndex: 5, finger: 1, startTimeMs: 2000 },
              { id: 'g-l5-b3', name: '5-String Sweep Climax', frequency: 659.25, durationMs: 2000, fret: 12, stringIndex: 5, finger: 1, startTimeMs: 4000 },
              { id: 'g-l5-b4', name: 'Tapped Harmonic Outro', frequency: 880.00, durationMs: 4000, fret: 17, stringIndex: 5, finger: 0, startTimeMs: 6000 },
            ],
            postureGuidance: {
              ideal: 'True virtuoso stage command; fluid transitions across frets 0 to 17, relaxed breathing and facial composure.',
              commonMistakes: ['Holding breath during virtuosic sweep sections', 'Tense upper traps lifting shoulders toward ears'],
              correctiveTip: 'Anchor yourself in deep diaphragmatic breathing; trust muscle memory and relax into performance flow.'
            }
          }
        ]
      }
    ]
  },
  // =========================================================================
  // D. VIOLIN
  // =========================================================================
  violin: {
    instrument: 'violin',
    displayName: 'Classical & Contemporary Violin',
    tagline: 'Collarbone balance, straight bow trajectories, and micro-tonal intonation perfection',
    accentColor: '#E889A5',
    focusAreas: [
      'Chin / collarbone anchor & hands-free balance',
      'Relaxed bow grip & flexible right thumb',
      'Straight bowing highway perpendicular to bridge',
      'Contact point tone lanes (bridge, center, fingerboard)',
      'Fretless intonation & open string resonance checks',
      'First-position finger patterns (high 2, low 2, low 1)',
      'Position shifting (3rd, 4th, 5th) & continuous vibrato',
    ],
    levels: [
      {
        levelNumber: 1,
        title: 'Tier 1: Absolute Beginner',
        tierName: 'Absolute Beginner',
        durationSpan: 'Weeks 1–8',
        dailyPracticeMinutes: '30–45 min/day',
        focusSummary: 'Chin/collarbone positioning, relaxed bow grip, open string bowing (G, D, A, E), basic rhythm bowings.',
        outcome: 'Support violin hands-free on collarbone; produce straight 4-count open-string long bows with even dynamic tone.',
        accentColor: '#E889A5',
        requiredXp: 0,
        unlocked: true,
        completed: true,
        completionPercent: 100,
        dailyRoutine: [
          { activity: 'Collarbone balance drill (hands-free 20s)', minutes: 5 },
          { activity: 'Bow hold windshield-wiper flexibility', minutes: 5 },
          { activity: 'Open string long bows (G-D-A-E, 4 counts)', minutes: 10 },
          { activity: 'Basic rhythm bowings & string crossings', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Open String Bow Highway Rhythms', artistOrComposer: 'Suzuki Book 1 Preparation', type: 'Western/Classical', keyOrRaga: 'D Major', tempoBpm: 60 },
          { title: 'Twinkle Twinkle Little Star (Rhythm Variations)', artistOrComposer: 'Shinichi Suzuki', type: 'Western/Classical', keyOrRaga: 'A Major', tempoBpm: 64 },
          { title: 'Sa-Re-Ga Single-String Intonation Drill', artistOrComposer: 'Indian Violin Basics', type: 'Indian/Hindi', keyOrRaga: 'Bilawal / D String', tempoBpm: 55 },
        ],
        exercises: [
          {
            id: 'violin-t1-ex1',
            title: 'Hands-Free Collarbone Balance & Long Open D Bows',
            subtitle: 'Violin resting on left collarbone; straight down-bow and up-bow parallel to bridge',
            durationMinutes: 8,
            difficulty: 1,
            goal: 'Bow full stroke on open D string for 4 slow beats without skewing crookedly.',
            category: 'posture',
            tempoBpm: 55,
            timeSignature: '4/4',
            keySignature: 'D Major',
            notes: [
              { id: 'v-t1-1', name: 'D4', frequency: 293.66, durationMs: 2000, stringIndex: 1, finger: 0, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t1-2', name: 'D4', frequency: 293.66, durationMs: 2000, stringIndex: 1, finger: 0, bowDirection: 'up', startTimeMs: 2000 },
            ],
            postureGuidance: {
              ideal: 'Violin rests on collarbone supported by chin/jaw weight, leaving left hand relaxed. Bow travels parallel to bridge.',
              commonMistakes: ['Collapsing left wrist like holding a pancake', 'Crooked bow skewing behind back'],
              correctiveTip: 'Straighten left wrist; do not collapse inward toward instrument neck.'
            }
          },
          {
            id: 'violin-t1-ex2',
            title: 'First Finger (B on A String) Tape Drop',
            subtitle: 'Square knuckle drop on A string with curved index finger',
            durationMinutes: 10,
            difficulty: 1,
            goal: 'Drop finger 1 on B4 with exact pitch checked against tuner or open string resonance.',
            category: 'technique',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'A Major',
            notes: [
              { id: 'v-t1-3', name: 'A4', frequency: 440.00, durationMs: 1500, stringIndex: 2, finger: 0, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t1-4', name: 'B4', frequency: 493.88, durationMs: 1500, stringIndex: 2, finger: 1, bowDirection: 'up', startTimeMs: 1500 },
              { id: 'v-t1-5', name: 'A4', frequency: 440.00, durationMs: 1500, stringIndex: 2, finger: 0, bowDirection: 'down', startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Finger curves like a miniature table leg dropping vertically from base knuckle.',
              commonMistakes: ['Flat finger pads muffling tone', 'Clutching neck with thumb web'],
              correctiveTip: 'Keep space between thumb web and violin neck; drop finger 1 from base knuckle.'
            }
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Tier 2: Early Intermediate',
        tierName: 'Early Intermediate',
        durationSpan: 'Months 2–6',
        dailyPracticeMinutes: '45–60 min/day',
        focusSummary: 'First position finger placements (tapes), finger pattern changes, smooth bow direction transitions.',
        outcome: 'Play in tune in first position across all 4 strings; execute high 2 and low 2 patterns with smooth bow changes.',
        accentColor: '#E889A5',
        requiredXp: 300,
        unlocked: true,
        completed: false,
        completionPercent: 20,
        dailyRoutine: [
          { activity: 'D & A Major one-octave scales (separate bows)', minutes: 12 },
          { activity: 'Finger pattern changes (high 2 vs low 2)', minutes: 12 },
          { activity: 'Smooth bow changes (silent transition drill)', minutes: 10 },
          { activity: 'Repertoire: Minuet No. 1 / Lightly Row', minutes: 20 },
        ],
        repertoireMilestones: [
          { title: 'Minuet No. 1 in G Major', artistOrComposer: 'J.S. Bach / Petzold', type: 'Western/Classical', keyOrRaga: 'G Major', tempoBpm: 80 },
          { title: 'Lightly Row / May Song', artistOrComposer: 'Suzuki Book 1 Core', type: 'Western/Classical', keyOrRaga: 'A Major', tempoBpm: 76 },
          { title: 'Bollywood Romantic Melody Fragment', artistOrComposer: 'Arranged for Violin 1st Pos', type: 'Indian/Hindi', keyOrRaga: 'D Major', tempoBpm: 66 },
        ],
        exercises: [
          {
            id: 'violin-t2-ex1',
            title: 'D Major Scale & High 2 Finger Pattern',
            subtitle: 'D-E-F#-G on D string, A-B-C#-D on A string with ring finger resonance check',
            durationMinutes: 12,
            difficulty: 2,
            goal: 'Ring third finger notes in acoustic sympathy with adjacent open strings.',
            category: 'scales_alankars',
            tempoBpm: 65,
            timeSignature: '4/4',
            keySignature: 'D Major',
            notes: [
              { id: 'v-t2-1', name: 'D4', frequency: 293.66, durationMs: 800, stringIndex: 1, finger: 0, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t2-2', name: 'E4', frequency: 329.63, durationMs: 800, stringIndex: 1, finger: 1, bowDirection: 'up', startTimeMs: 800 },
              { id: 'v-t2-3', name: 'F#4', frequency: 369.99, durationMs: 800, stringIndex: 1, finger: 2, bowDirection: 'down', startTimeMs: 1600 },
              { id: 'v-t2-4', name: 'G4', frequency: 392.00, durationMs: 800, stringIndex: 1, finger: 3, bowDirection: 'up', startTimeMs: 2400 },
              { id: 'v-t2-5', name: 'A4', frequency: 440.00, durationMs: 800, stringIndex: 2, finger: 0, bowDirection: 'down', startTimeMs: 3200 },
              { id: 'v-t2-6', name: 'B4', frequency: 493.88, durationMs: 800, stringIndex: 2, finger: 1, bowDirection: 'up', startTimeMs: 4000 },
              { id: 'v-t2-7', name: 'C#5', frequency: 554.37, durationMs: 800, stringIndex: 2, finger: 2, bowDirection: 'down', startTimeMs: 4800 },
              { id: 'v-t2-8', name: 'D5', frequency: 587.33, durationMs: 1600, stringIndex: 2, finger: 3, bowDirection: 'up', startTimeMs: 5600 },
            ],
            postureGuidance: {
              ideal: 'Fingers 2 and 3 touch when playing high 2; keep finger 1 planted to stabilize hand frame.',
              commonMistakes: ['Lifting fingers high off fingerboard losing intonation reference', 'Collapsed palm'],
              correctiveTip: 'Keep right elbow elevation level with active string plane.'
            }
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Tier 3: Intermediate',
        tierName: 'Intermediate',
        durationSpan: 'Months 6–18',
        dailyPracticeMinutes: '60–90 min/day',
        focusSummary: 'Intonation without visual guides, slurred bowing, 3rd position shifting, initial vibrato mechanics.',
        outcome: 'Shift smoothly between 1st and 3rd positions; execute arm/wrist vibrato oscillations and slurred string crossings.',
        accentColor: '#E889A5',
        requiredXp: 800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Same-finger 1st to 3rd position shifting drill', minutes: 15 },
          { activity: 'Pre-vibrato tabletop & wall roll exercises', minutes: 15 },
          { activity: 'Slurred 4-note and 8-note bowings on scales', minutes: 15 },
          { activity: 'Repertoire: Vivaldi Concerto / Seitz Student Concerto', minutes: 25 },
        ],
        repertoireMilestones: [
          { title: 'Vivaldi Violin Concerto in A Minor (Op. 3 No. 6)', artistOrComposer: 'Antonio Vivaldi', type: 'Western/Classical', keyOrRaga: 'A Minor', tempoBpm: 90 },
          { title: 'Seitz Student Concerto No. 2 (3rd Position)', artistOrComposer: 'Friedrich Seitz', type: 'Western/Classical', keyOrRaga: 'G Major', tempoBpm: 84 },
          { title: 'Indian Violin Alaap & Meend Slide', artistOrComposer: 'Carnatic / Hindustani Style', type: 'Indian/Hindi', keyOrRaga: 'Raag Yaman', tempoBpm: 56 },
        ],
        exercises: [
          {
            id: 'violin-t3-ex1',
            title: 'Third Position Shifting (1st to 3rd Position Guide Finger)',
            subtitle: 'Slide entire hand smoothly toward bridge; thumb travels in unison with hand frame',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Shift from B4 (1st pos) to D5 (3rd pos) with zero audible glitch or wrist collapse.',
            category: 'technique',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'D Major',
            notes: [
              { id: 'v-t3-1', name: 'B4 (1st Pos)', frequency: 493.88, durationMs: 1200, stringIndex: 2, finger: 1, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t3-2', name: 'D5 (3rd Pos)', frequency: 587.33, durationMs: 1500, stringIndex: 2, finger: 1, bowDirection: 'up', startTimeMs: 1200 },
              { id: 'v-t3-3', name: 'E5 (3rd Pos)', frequency: 659.25, durationMs: 1500, stringIndex: 2, finger: 2, bowDirection: 'down', startTimeMs: 2700 },
            ],
            postureGuidance: {
              ideal: 'Keep finger touching string lightly as a glide skate; do not press firmly during the shift motion.',
              commonMistakes: ['Thumb lagging behind neck causing hand twisting', 'Reaching with finger instead of moving whole arm frame'],
              correctiveTip: 'Move the forearm and thumb as one unified unit from the elbow hinge.'
            }
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Tier 4: Advanced',
        tierName: 'Advanced',
        durationSpan: 'Years 2–4',
        dailyPracticeMinutes: '90–120 min/day',
        focusSummary: 'Advanced shifting (2nd, 4th, 5th positions), continuous vibrato, spiccato and staccato bowing techniques.',
        outcome: 'Perform Mozart violin concertos with bouncing spiccato and continuous singing vibrato through shifts.',
        accentColor: '#E889A5',
        requiredXp: 1600,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Spiccato controlled bounce drills at balance point', minutes: 20 },
          { activity: '3-octave scales in G, A, Bb with position shifts', minutes: 25 },
          { activity: 'Double stops: thirds and octaves preparation', minutes: 20 },
          { activity: 'Repertoire: Mozart Concerto No. 3 / Bach Partita', minutes: 35 },
        ],
        repertoireMilestones: [
          { title: 'Mozart Violin Concerto No. 3 in G Major (K. 216)', artistOrComposer: 'W.A. Mozart', type: 'Western/Classical', keyOrRaga: 'G Major', tempoBpm: 104 },
          { title: 'Bach Partita in E Major (Preludio)', artistOrComposer: 'J.S. Bach (BWV 1006)', type: 'Western/Classical', keyOrRaga: 'E Major', tempoBpm: 96 },
        ],
        exercises: [
          {
            id: 'violin-t4-ex1',
            title: 'Spiccato Bouncing Bow Stroke & 5th Position Passage',
            subtitle: 'Controlled rebound near bow balance point with flexible wrist and fingers',
            durationMinutes: 15,
            difficulty: 4,
            goal: 'Execute crisp 16th-note spiccato at 96 BPM with consistent tone and bounce height.',
            category: 'technique',
            tempoBpm: 96,
            timeSignature: '4/4',
            keySignature: 'G Major',
            notes: [
              { id: 'v-t4-1', name: 'G4', frequency: 392.00, durationMs: 400, stringIndex: 1, finger: 3, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t4-2', name: 'A4', frequency: 440.00, durationMs: 400, stringIndex: 2, finger: 0, bowDirection: 'up', startTimeMs: 400 },
              { id: 'v-t4-3', name: 'B4', frequency: 493.88, durationMs: 400, stringIndex: 2, finger: 1, bowDirection: 'down', startTimeMs: 800 },
              { id: 'v-t4-4', name: 'C5', frequency: 523.25, durationMs: 400, stringIndex: 2, finger: 2, bowDirection: 'up', startTimeMs: 1200 },
            ],
            postureGuidance: {
              ideal: 'Let the natural elasticity of the pernambuco/carbon bow stick rebound off the string.',
              commonMistakes: ['Forcing the bounce with a stiff wrist', 'Bowing too near the tip where bow is too light'],
              correctiveTip: 'Keep right index and pinky fingers flexible like shock absorbers.'
            }
          }
        ]
      },
      {
        levelNumber: 5,
        title: 'Tier 5: Professional',
        tierName: 'Professional',
        durationSpan: 'Months 16+',
        dailyPracticeMinutes: '2–3 hours/day',
        focusSummary: 'Complex concerto repertoire, double stops, artificial harmonics, solo performance expression and dynamics.',
        outcome: 'Perform Mendelssohn/Bruch concertos, master double-stop thirds/octaves, and excel in recording studios.',
        accentColor: '#E889A5',
        requiredXp: 2800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Double-stop scale studies in thirds, sixths, octaves', minutes: 30 },
          { activity: 'Paganini caprices & virtuoso bowing (sautillé, ricochet)', minutes: 35 },
          { activity: 'Intonation perfection with drone accompaniment', minutes: 25 },
          { activity: 'Master concerto run-throughs and mock recitals', minutes: 45 },
        ],
        repertoireMilestones: [
          { title: 'Mendelssohn Violin Concerto in E Minor (Op. 64)', artistOrComposer: 'Felix Mendelssohn', type: 'Western/Classical', keyOrRaga: 'E Minor', tempoBpm: 112 },
          { title: 'Paganini Caprice No. 24 (Theme & Variations)', artistOrComposer: 'Niccolò Paganini', type: 'Western/Classical', keyOrRaga: 'A Minor', tempoBpm: 108 },
          { title: 'Indian Classical Fusion Concerto Solo', artistOrComposer: 'L. Subramaniam style', type: 'Indian/Hindi', keyOrRaga: 'Charukesi / Tala', tempoBpm: 94 },
        ],
        exercises: [
          {
            id: 'violin-t5-ex1',
            title: 'Double-Stops: Parallel Thirds & Artificial Harmonics',
            subtitle: 'Finger 1 stops root while finger 4 creates light touch fourth harmonic',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Balance bow weight equally across both strings for pure ringing harmonic intonation.',
            category: 'repertoire',
            tempoBpm: 72,
            timeSignature: '4/4',
            keySignature: 'E Minor',
            notes: [
              { id: 'v-t5-1', name: 'B4 + G4', frequency: 493.88, durationMs: 1500, stringIndex: 2, finger: 1, bowDirection: 'down', startTimeMs: 0 },
              { id: 'v-t5-2', name: 'C5 + A4', frequency: 523.25, durationMs: 1500, stringIndex: 2, finger: 2, bowDirection: 'up', startTimeMs: 1500 },
              { id: 'v-t5-3', name: 'E6 (Harmonic)', frequency: 1318.51, durationMs: 2000, stringIndex: 3, finger: 4, bowDirection: 'down', startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Bow angle rests precisely on the junction plane between two strings.',
              commonMistakes: ['Favoring one string causing the other to squeak', 'Excess finger squeeze tightening hand'],
              correctiveTip: 'Keep thumb loose underneath neck; align knuckles with fingerboard angle.'
            }
          }
        ]
      }
    ]
  }
};

export const RECOMMENDED_SONGS = [
  {
    id: 'song-rec-1',
    title: 'Clair de Lune (Debussy Impressionism)',
    instrument: 'piano' as const,
    composer: 'Claude Debussy',
    difficulty: 'Intermediate',
    tempoBpm: 66,
    highlightColor: '#FF8066', // Coral Orange per specs
    description: 'Harmonic pedal depth, gentle left-hand arpeggiation, and lyrical melody voicing.',
    xpReward: 150,
  },
  {
    id: 'song-rec-2',
    title: 'Hotel California (Acoustic Intro Solo)',
    instrument: 'guitar' as const,
    composer: 'The Eagles',
    difficulty: 'Intermediate',
    tempoBpm: 75,
    highlightColor: '#FF8066',
    description: '12-string acoustic arpeggios, barre transitions, and expressive fret vibrato.',
    xpReward: 180,
  },
  {
    id: 'song-rec-3',
    title: 'Bach Partita in E Minor (Preludio)',
    instrument: 'violin' as const,
    composer: 'J.S. Bach',
    difficulty: 'Early Intermediate',
    tempoBpm: 84,
    highlightColor: '#FF8066',
    description: 'Rhythmic bariolage, string crossings, and pure open resonance.',
    xpReward: 160,
  },
  {
    id: 'song-rec-4',
    title: 'Raag Yaman - Alap & Bandish in Teental',
    instrument: 'bansuri' as const,
    composer: 'Traditional Hindustani',
    difficulty: 'Early Intermediate',
    tempoBpm: 60,
    highlightColor: '#FF8066',
    description: 'Teevra Ma expression, delicate Meend slides from Ni to Dha, and meditative tone.',
    xpReward: 190,
  },
];

export const EAR_TRAINING_QUESTIONS: EarTrainingQuestion[] = [
  {
    id: 'ear-1',
    category: 'chord',
    prompt: 'Listen to the 3-note harmonic triad. What chord quality is this?',
    targetFrequencies: [261.63, 329.63, 392.00], // C Major
    options: [
      { label: 'C Major Triad (Bright, Resolved)', isCorrect: true },
      { label: 'C Minor Triad (Dark, Melancholic)', isCorrect: false },
      { label: 'C Diminished (Tense, Unstable)', isCorrect: false },
      { label: 'C Augmented (Dreamy, Floating)', isCorrect: false }
    ],
    explanation: 'The Major triad consists of a Root (C), Major 3rd (E, +4 semitones), and Perfect 5th (G, +7 semitones). It creates a stable, bright acoustic consonance.'
  },
  {
    id: 'ear-2',
    category: 'swara',
    prompt: 'Listen to this Swara relative to the Sa drone (261.63 Hz). Identify the Swara.',
    targetFrequencies: [392.00], // Pa (Perfect 5th)
    options: [
      { label: 'Pa (Pancham / Perfect 5th)', isCorrect: true },
      { label: 'Re (Rishabh / Major 2nd)', isCorrect: false },
      { label: 'Ga (Gandhar / Major 3rd)', isCorrect: false },
      { label: 'Dha (Dhaivat / Major 6th)', isCorrect: false }
    ],
    explanation: 'Pancham (Pa) is the 5th degree in the saptak, vibrating at a 3:2 frequency ratio to the tonic Sa. It is immutable (Achala) and deeply grounding.'
  },
  {
    id: 'ear-3',
    category: 'interval',
    prompt: 'Identify the melodic interval between the first and second tone.',
    targetFrequencies: [261.63, 392.00], // C4 to G4 (Perfect 5th)
    options: [
      { label: 'Perfect 5th (7 Semitones)', isCorrect: true },
      { label: 'Perfect 4th (5 Semitones)', isCorrect: false },
      { label: 'Major 3rd (4 Semitones)', isCorrect: false },
      { label: 'Octave (12 Semitones)', isCorrect: false }
    ],
    explanation: 'The interval from C to G is a Perfect 5th, the cornerstone interval of Western harmony and universal acoustical resonance.'
  },
  {
    id: 'ear-4',
    category: 'chord',
    prompt: 'Listen to this chord. Notice the slight melancholy in the 3rd note.',
    targetFrequencies: [220.00, 261.63, 329.63], // A Minor
    options: [
      { label: 'A Minor Triad', isCorrect: true },
      { label: 'A Major Triad', isCorrect: false },
      { label: 'A Sus4 Chord', isCorrect: false },
      { label: 'A Dominant 7th', isCorrect: false }
    ],
    explanation: 'An A Minor chord features a Minor 3rd (C natural) 3 semitones above the root A, giving its distinctive contemplative timbre.'
  },
  {
    id: 'ear-guitar-string-pitch',
    category: 'single_note',
    prompt: 'Listen to the two guitar strings plucked sequentially. Is the second note HIGHER or LOWER in pitch than the first?',
    targetFrequencies: [82.41, 146.83], // Low E2 (6th string) to D3 (4th string)
    options: [
      { label: 'Second note is HIGHER in pitch', isCorrect: true },
      { label: 'Second note is LOWER in pitch', isCorrect: false },
      { label: 'Both notes are the same pitch (unison)', isCorrect: false }
    ],
    explanation: 'Plucking the 4th string (D3, 146.8 Hz) produces a higher fundamental frequency than the 6th string (Low E2, 82.4 Hz). Guitar strings increase in pitch from string 6 (thickest) to string 1 (thinnest).'
  },
  {
    id: 'ear-guitar-triad-quality',
    category: 'chord',
    prompt: 'Identify the triad chord quality played across the top 3 guitar strings.',
    targetFrequencies: [196.00, 246.94, 293.66], // G Major Triad (G, B, D)
    options: [
      { label: 'Major Triad (Bright, Uplifting)', isCorrect: true },
      { label: 'Minor Triad (Pensive, Dark)', isCorrect: false },
      { label: 'Diminished Triad (Tense, Suspenseful)', isCorrect: false },
      { label: 'Suspended 4th (Open, Unresolved)', isCorrect: false }
    ],
    explanation: 'The Major triad features a Major 3rd interval (4 semitones) between root and third, giving it its classic bright, consonant resonance.'
  }
];



// =========================================================================
// STRUCTURED LESSON TUTORIALS (WATCH MODE)
// =========================================================================
export const LESSON_TUTORIALS: Record<string, LessonTutorial> = {
  // Guitar Tutorials
  'tut-g-1.1': {
    id: 'tut-g-1.1',
    title: 'Guitar Posture, Tuning & Strumming Mechanics',
    subtitle: 'Module 1.1: Establishing ergonomic foundations before touching frets',
    durationMinutes: 4,
    summary: 'Master seated instrument posture, neck upward angle, centerline thumb alignment, and standard tuning verification with downstrokes.',
    keyTakeaways: [
      'Sit upright on the front half of the chair; rest waist of guitar on right thigh (or left for classical).',
      'Angle neck upward 30-40 degrees so the fretting hand does not have to bend uncomfortably at the wrist.',
      'Place thumb pad flat against the vertical centerline of the back of the neck, directly opposite fret 2.',
      'Tune 6 open strings: E2 (82.4 Hz), A2 (110 Hz), D3 (146.8 Hz), G3 (196 Hz), B3 (246.9 Hz), E4 (329.6 Hz).',
      'Execute downward pick strokes across all strings with a relaxed wrist pendulum motion at 60 BPM.',
    ],
    visualAids: ['Guitar Body Balance Diagram', 'Thumb Centerline Placement', 'Pick Angle 15° Down'],
    postureTips: [
      'Never allow the thumb to strangle the top of the neck during beginner open position practice.',
      'Keep left shoulder relaxed and dropped, not hitched up toward your ear.',
    ]
  },
  'tut-g-1.2': {
    id: 'tut-g-1.2',
    title: 'First Open Chord Triad: Em, Am, and C Major',
    subtitle: 'Module 1.2: Knuckle arching, fret wire proximity & 4-beat cadence transitions',
    durationMinutes: 5,
    summary: 'Discover the mechanical claw shape needed to cleanly ring open strings while fingering E Minor, A Minor, and C Major.',
    keyTakeaways: [
      'E Minor: Place middle finger on fret 2 of A string (string 5), ring finger on fret 2 of D string (string 4). Strum all 6 strings.',
      'A Minor: Form identical shape shifted one string down, adding index finger to fret 1 of B string (string 2). Strum strings 5 to 1.',
      'C Major: Pivot ring finger over to fret 3 of A string (string 5) while holding index on B string fret 1. Strum strings 5 to 1.',
      'AI Knuckle Arch Rule: Both proximal and distal knuckles must be curved 90° like a cat claw to avoid muting adjacent open strings.',
      'Fret Proximity: Place finger tips 1-2 millimeters right behind the metal fret wire, never in the middle of the fret pocket.',
    ],
    visualAids: ['Em/Am/C Fretboard Tabs', 'Perpendicular Knuckle Arch Camera Check', 'Chord Transition Pivot Map'],
    postureTips: [
      'Use the middle finger as an anchor point when shifting between Am and C.',
      'Ensure high open E string rings completely clear with zero buzzing.',
    ]
  },
  'tut-g-2.1': {
    id: 'tut-g-2.1',
    title: 'Open Chord Expansion & Syncopated Strumming',
    subtitle: 'Module 2.1: Expanding vocabulary with G, D, Maj7, E and the syncopated folk pattern',
    durationMinutes: 5,
    summary: 'Expand into G Major, D Major, C Major 7th, and E Major while driving a continuous Down-Down-Up-Up-Down-Up rhythm pattern.',
    keyTakeaways: [
      'G Major: Ring finger on high E (fret 3), middle on low E (fret 3), index on A (fret 2).',
      'D Major: Triangle finger cluster on strings 1, 2, 3 at frets 2 and 3. Mute string 6 with thumb overhang.',
      'Strumming Pattern: Down, Down, Up, Up, Down, Up (1, 2 &, & 4 &) with constant right-arm pendulum movement.',
      'Keep the right hand moving even on "ghost" beats where you do not strike strings.',
    ],
    visualAids: ['D-D-U-U-D-U Rhythm Matrix', 'Thumb Muting on 6th String'],
    postureTips: ['Do not stop the right wrist swinging on the upward miss between beat 2 and 3.']
  },
  'tut-g-2.2': {
    id: 'tut-g-2.2',
    title: 'Minor Pentatonic Scale (Box 1) Architecture',
    subtitle: 'Module 2.2: Root E open position box, alternate picking & fret proximity',
    durationMinutes: 5,
    summary: 'Master the universally acclaimed Minor Pentatonic Box 1 shape with strict alternate picking (Down-Up).',
    keyTakeaways: [
      'Root E pattern across 6 strings: 0-3, 0-2, 0-2, 0-2, 0-3, 0-3 (or 5th fret A minor box: 5-8, 5-7, 5-7, 5-7, 5-8, 5-8).',
      'Alternate Picking Rule: Every note must strictly alternate Down and Up strokes with minimal pick excursion.',
      'Keep unused fingers hovering no more than half an inch away from the fret wires.',
    ],
    visualAids: ['Pentatonic Box 1 Fret Diagram', 'Alternate Picking Down-Up Vectors'],
    postureTips: ['Rest the fleshy heel of your right thumb lightly on the lower strings to dampen unwanted noise.']
  },
  'tut-g-2.3': {
    id: 'tut-g-2.3',
    title: 'Expressive Lead Mechanics: Hammer-ons & Pull-offs',
    subtitle: 'Module 2.3: Slurred articulation without re-picking on strings 1, 2, and 3',
    durationMinutes: 4,
    summary: 'Produce fluid legato runs by snapping fingers onto the fretboard (hammer-on) and plucking downward off strings (pull-off).',
    keyTakeaways: [
      'Hammer-on: Strike string once with pick, then drive finger 2 or 3 down like a quick hammer onto the target fret.',
      'Pull-off: Pluck the fretted note, then pluck downward and slightly inward with the fretting finger to sound the lower note.',
      'Balance volume so the hammered note matches the dynamic level of the picked note.',
    ],
    visualAids: ['Hammer-on Percussive Snap Angle', 'Pull-off Pluck Vector'],
    postureTips: ['Keep wrist steady; generate hammer power from the finger knuckle, not by moving your whole forearm.']
  },
  'tut-g-3.1': {
    id: 'tut-g-3.1',
    title: 'F-Shape & B-Shape Movable Barre Chords',
    subtitle: 'Module 3.1: Even pressure distribution, parallel fret alignment & back-muscle leverage',
    durationMinutes: 6,
    summary: 'Unlock the entire fretboard with movable E-shape and A-shape barre chords without hand fatigue.',
    keyTakeaways: [
      'Roll index finger slightly onto its bony lateral edge rather than pressing with the soft front pad.',
      'Index finger must remain strictly parallel to the fret wire, 1mm behind it.',
      'Pull the left elbow gently into your ribcage to utilize latissimus and bicep weight rather than thumb pinch force.',
      'F Major (E-shape at fret 1) and B Minor (A-shape at fret 2) form the gateway to any key signature.',
    ],
    visualAids: ['Barre Index Bony Edge Angle', 'Elbow Leverage Force Vector', 'E-Shape vs A-Shape Movable Roots'],
    postureTips: ['Drop wrist slightly under the neck so fingers 2, 3, 4 can arch cleanly over the barre.']
  },
  'tut-g-3.2': {
    id: 'tut-g-3.2',
    title: 'Travis Fingerstyle (P-I-M-A) & Palm Muting',
    subtitle: 'Module 3.2: Polyphonic independence between thumb basslines and treble melodies',
    durationMinutes: 5,
    summary: 'Combine alternating bass thumb movements (P) with index (I), middle (M), and ring (A) arpeggiated rolls.',
    keyTakeaways: [
      'P (Pulgar/Thumb): Handles alternating bass on strings 6, 5, 4.',
      'I (Indice), M (Medio), A (Anular): Handle melody and harmony on strings 3, 2, 1.',
      'Palm Muting: Rest the hypothenar pad of the right hand directly over the bridge saddles for a thumpy, acoustic chugging bass.',
    ],
    visualAids: ['P-I-M-A Finger Allocation Chart', 'Bridge Saddle Palm Mute Contact Zone'],
    postureTips: ['Keep the right thumb forward of the fingers to prevent collisions during simultaneous plucks.']
  },
  'tut-g-4.1': {
    id: 'tut-g-4.1',
    title: 'CAGED System Fretboard Logic & Triad Inversions',
    subtitle: 'Module 4.1: Seamless neck-wide connectivity across 5 interlocking shapes and top-3 string triads',
    durationMinutes: 6,
    summary: 'Demystify the guitar neck by connecting C, A, G, E, and D shapes and mastering root, 1st, and 2nd triad inversions on strings 1-2-3.',
    keyTakeaways: [
      'The 5 open shapes connect sequentially: C -> A -> G -> E -> D -> C up the octave.',
      'Strings 1-2-3 Triads: Master Root position (Root in bass), 1st inversion (3rd in bass), and 2nd inversion (5th in bass).',
      'Enables voice-leading in rhythm guitar and agile target note targeting in lead solos.',
    ],
    visualAids: ['CAGED Interlocking Puzzle Map', 'Strings 1-2-3 Triad Shapes'],
    postureTips: ['Slide thumb along the center of the neck smoothly when shifting between CAGED positions.']
  },
  'tut-g-4.2': {
    id: 'tut-g-4.2',
    title: 'Expressive Lead: Whole-Step Bending & Vibrato',
    subtitle: 'Module 4.2: Pitch graph tracking for accurate micro-tonal bends (+200 cents) and vocal vibrato',
    durationMinutes: 5,
    summary: 'Learn David Gilmour-style whole-step bends and vocal-like finger vibrato verified with real-time DSP cents tracking.',
    keyTakeaways: [
      'Group fingers 1 and 2 directly behind finger 3 to provide 3-finger muscular support for the bend.',
      'Rotate forearm like turning a door handle; do not push with finger joints alone.',
      'Listen for the target pitch (e.g. 7th fret D bent to 9th fret E = +200 cents). The VIBEX DSP meter turns glowing green when in pitch.',
      'Apply side-to-side wrist vibrato at the top of the bend to add sustain and emotion.',
    ],
    visualAids: ['Three-Finger Bending Cluster', 'Forearm Rotation Axis', 'Pitch Cents Trajectory Graph'],
    postureTips: ['Hook thumb lightly over the top of the neck to establish a solid rotational fulcrum for bending.']
  },
  'tut-g-4.3': {
    id: 'tut-g-4.3',
    title: 'Modes & Modal Soloing: Dorian and Mixolydian',
    subtitle: 'Module 4.3: Infusing soulful jazz-rock and Indian Classical fusion flavors',
    durationMinutes: 6,
    summary: 'Discover the characteristic intervals of the Dorian mode (Major 6th) and Mixolydian mode (Flatted 7th).',
    keyTakeaways: [
      'Dorian Mode: Minor scale with a bright natural 6th degree (used in Santana, Miles Davis, Bollywood jazz fusion).',
      'Mixolydian Mode: Major scale with a bluesy flat 7th degree (Guns N Roses, Allman Brothers, Classic Rock).',
      'Target modal color tones on strong beats over backing tracks.',
    ],
    visualAids: ['Dorian Color Tones Chart', 'Mixolydian Characteristic Box'],
    postureTips: ['Keep left elbow floating freely to easily reach wide 4-fret modal box spans.']
  },
  'tut-g-5.1': {
    id: 'tut-g-5.1',
    title: 'Virtuoso Mechanics: Sweep Picking, Tapping & Extended Voicings',
    subtitle: 'Module 5.1: Synchronized arpeggio rakes, two-handed fretboard tapping & modern chord colors',
    durationMinutes: 7,
    summary: 'Master the high-speed mechanics of 3-string and 5-string sweep arpeggios, two-handed tapping, Maj9, Min11, and Altered dominant shapes.',
    keyTakeaways: [
      'Sweep Picking: Push/pull pick in a single uninterrupted brush stroke across strings; lift fretting fingers immediately to prevent ringing.',
      'Two-Handed Tapping: Hammer right-hand index/middle finger sharply onto high frets and flick off to sound notes.',
      'Extended Harmony: Major 9th, Minor 11th, and Altered Dominants (7#9, 7b9, 7#11) for modern jazz, neo-soul, and prog metal.',
    ],
    visualAids: ['5-String Sweep Rake Vector', 'Tapping Finger Placement', 'Extended Chord Voicing Diagrams'],
    postureTips: ['Mute unplayed low strings with the palm of your picking hand to maintain surgical note clarity.']
  },
  'tut-g-5.2': {
    id: 'tut-g-5.2',
    title: 'Professional Performance, Tone Shaping & Concert Improvisation',
    subtitle: 'Module 5.2: Stage presence, dynamic backing track navigation & multi-key solos',
    durationMinutes: 8,
    summary: 'Transition from practice room to concert stage: tone shaping, key modulation, uninterrupted 30-minute endurance, and real-time multimodal evaluation.',
    keyTakeaways: [
      'Improvise fluently through shifting tonal centers and modulating key signatures.',
      'Shape tone using touch dynamics: soft finger-brushing to aggressive pick attacks.',
      'Maintain poise, continuous breathing, and relaxed posture under full performance pressure.',
    ],
    visualAids: ['Key Modulation Transition Map', 'Performance Endurance Timeline'],
    postureTips: ['Breathe deeply from diaphragm on every musical breath pause; avoid raising shoulders.']
  }
};

// =========================================================================
// CANDY CRUSH PROGRESSION NODES (PRACTICE MAP TRAIL)
// =========================================================================
export const GUITAR_PRACTICE_NODES: PracticeNode[] = [
  // --- LEVEL 1 ---
  {
    id: 'g-n-1.1-tut',
    levelNumber: 1,
    moduleId: 'mod-1.1',
    moduleTitle: 'Module 1.1: Posture & Tuning Mechanics',
    nodeIndex: 1,
    title: 'Seated Posture & Thumb Alignment',
    subtitle: 'Tutorial: Learn correct seating, neck angle & thumb placement',
    type: 'tutorial',
    tutorialId: 'tut-g-1.1',
    durationMinutes: 4,
    xpReward: 50,
    status: 'completed',
    stars: 3,
    accuracyScore: 98,
    pathOffset: -0.6
  },
  {
    id: 'g-n-1.1-prac',
    levelNumber: 1,
    moduleId: 'mod-1.1',
    moduleTitle: 'Module 1.1: Posture & Tuning Mechanics',
    nodeIndex: 2,
    title: 'Open String Tuning & Plucking',
    subtitle: 'Practice: Verify E2-A2-D3-G3-B3-E4 pitch with YIN algorithm',
    type: 'practice',
    exerciseId: 'guitar-l1-ex1',
    tutorialId: 'tut-g-1.1',
    durationMinutes: 6,
    xpReward: 75,
    status: 'completed',
    stars: 3,
    accuracyScore: 95,
    pathOffset: -0.2
  },
  {
    id: 'g-n-1.2-tut',
    levelNumber: 1,
    moduleId: 'mod-1.2',
    moduleTitle: 'Module 1.2: First Open Chord Triad',
    nodeIndex: 3,
    title: 'Em, Am & C Knuckle Arch Geometry',
    subtitle: 'Tutorial: Watch fingertip perpendicular claw placement',
    type: 'tutorial',
    tutorialId: 'tut-g-1.2',
    durationMinutes: 5,
    xpReward: 60,
    status: 'completed',
    stars: 3,
    accuracyScore: 92,
    pathOffset: 0.3
  },
  {
    id: 'g-n-1.2-prac',
    levelNumber: 1,
    moduleId: 'mod-1.2',
    moduleTitle: 'Module 1.2: First Open Chord Triad',
    nodeIndex: 4,
    title: '4-Beat Chord Switch Cadence',
    subtitle: 'Practice: Em -> Am -> C -> Em transitions with live AI Vision',
    type: 'practice',
    exerciseId: 'guitar-l1-ex2',
    tutorialId: 'tut-g-1.2',
    durationMinutes: 10,
    xpReward: 90,
    status: 'active', // Current active node
    pathOffset: 0.7
  },
  {
    id: 'g-n-1.3-ear',
    levelNumber: 1,
    moduleId: 'mod-1.3',
    moduleTitle: 'Module 1.3: Ear Gym & Rhythmic Practice',
    nodeIndex: 5,
    title: 'Ear Gym: Higher vs Lower String Variations',
    subtitle: 'Bonus: 2-minute quickfire auditory string recognition drill',
    type: 'ear_gym',
    earGymQuestionId: 'ear-guitar-string-pitch',
    durationMinutes: 2,
    xpReward: 80,
    status: 'locked',
    pathOffset: 0.3
  },
  {
    id: 'g-n-1.3-boss',
    levelNumber: 1,
    moduleId: 'mod-1.3',
    moduleTitle: 'Module 1.3: Ear Gym & Rhythmic Practice',
    nodeIndex: 6,
    title: 'Level 1 Boss: 8-Bar Open Strum Track (70 BPM)',
    subtitle: 'Boss Milestone: 8-bar uninterrupted rhythm test with chord transitions',
    type: 'boss',
    exerciseId: 'guitar-l1-boss',
    tutorialId: 'tut-g-1.2',
    durationMinutes: 12,
    xpReward: 250,
    status: 'locked',
    bossTier: true,
    bossBadge: 'Level 1 Rhythm Titan',
    pathOffset: -0.3
  },

  // --- LEVEL 2 ---
  {
    id: 'g-n-2.1-tut',
    levelNumber: 2,
    moduleId: 'mod-2.1',
    moduleTitle: 'Module 2.1: Open Chord Expansion',
    nodeIndex: 7,
    title: 'Folk Strumming & Chord Expansion',
    subtitle: 'Tutorial: G, D, Maj7, E and the syncopated D-D-U-U-D-U pattern',
    type: 'tutorial',
    tutorialId: 'tut-g-2.1',
    durationMinutes: 5,
    xpReward: 70,
    status: 'locked',
    pathOffset: -0.7
  },
  {
    id: 'g-n-2.1-prac',
    levelNumber: 2,
    moduleId: 'mod-2.1',
    moduleTitle: 'Module 2.1: Open Chord Expansion',
    nodeIndex: 8,
    title: 'Syncopated Folk Strum Workout',
    subtitle: 'Practice: Continuous D-D-U-U-D-U across G, D, and E Major',
    type: 'practice',
    exerciseId: 'guitar-l2-ex1',
    tutorialId: 'tut-g-2.1',
    durationMinutes: 10,
    xpReward: 100,
    status: 'locked',
    pathOffset: -0.3
  },
  {
    id: 'g-n-2.2-tut',
    levelNumber: 2,
    moduleId: 'mod-2.2',
    moduleTitle: 'Module 2.2: Minor Pentatonic Scale',
    nodeIndex: 9,
    title: 'Pentatonic Box 1 Architecture',
    subtitle: 'Tutorial: Alternate picking and fret wire proximity on Root E',
    type: 'tutorial',
    tutorialId: 'tut-g-2.2',
    durationMinutes: 5,
    xpReward: 75,
    status: 'locked',
    pathOffset: 0.2
  },
  {
    id: 'g-n-2.2-prac',
    levelNumber: 2,
    moduleId: 'mod-2.2',
    moduleTitle: 'Module 2.2: Minor Pentatonic Scale',
    nodeIndex: 10,
    title: 'Box 1 Alternate Picking Run',
    subtitle: 'Practice: 12-note ascending and descending picking ladder',
    type: 'practice',
    exerciseId: 'guitar-l2-ex2',
    tutorialId: 'tut-g-2.2',
    durationMinutes: 10,
    xpReward: 110,
    status: 'locked',
    pathOffset: 0.6
  },
  {
    id: 'g-n-2.3-boss',
    levelNumber: 2,
    moduleId: 'mod-2.3',
    moduleTitle: 'Module 2.3: Expressive Techniques',
    nodeIndex: 11,
    title: 'Level 2 Boss: 12-Bar Rhythm & Box 1 Pentatonic Lead Run',
    subtitle: 'Boss Milestone: Hammer-on & pull-off articulation over 12 bars',
    type: 'boss',
    exerciseId: 'guitar-l2-boss',
    tutorialId: 'tut-g-2.3',
    durationMinutes: 14,
    xpReward: 350,
    status: 'locked',
    bossTier: true,
    bossBadge: 'Level 2 Pentatonic Hero',
    pathOffset: 0.0
  },

  // --- LEVEL 3 ---
  {
    id: 'g-n-3.1-tut',
    levelNumber: 3,
    moduleId: 'mod-3.1',
    moduleTitle: 'Module 3.1: F & B Barre Chords',
    nodeIndex: 12,
    title: 'Barre Chord Mechanics & Elbow Leverage',
    subtitle: 'Tutorial: Index finger lateral rotation & wrist arch validation',
    type: 'tutorial',
    tutorialId: 'tut-g-3.1',
    durationMinutes: 6,
    xpReward: 90,
    status: 'locked',
    pathOffset: -0.6
  },
  {
    id: 'g-n-3.1-prac',
    levelNumber: 3,
    moduleId: 'mod-3.1',
    moduleTitle: 'Module 3.1: F & B Barre Chords',
    nodeIndex: 13,
    title: 'F-Shape & B-Shape Clean Clamp Drill',
    subtitle: 'Practice: Zero-buzz 6-string barre chord intonation test',
    type: 'practice',
    exerciseId: 'guitar-l3-ex1',
    tutorialId: 'tut-g-3.1',
    durationMinutes: 12,
    xpReward: 140,
    status: 'locked',
    pathOffset: -0.2
  },
  {
    id: 'g-n-3.2-prac',
    levelNumber: 3,
    moduleId: 'mod-3.2',
    moduleTitle: 'Module 3.2: Fingerstyle & Palm Muting',
    nodeIndex: 14,
    title: 'Travis Picking (P-I-M-A) & Bridge Muting',
    subtitle: 'Practice: Alternating bass thumb with treble finger rolls',
    type: 'practice',
    exerciseId: 'guitar-l3-ex2',
    tutorialId: 'tut-g-3.2',
    durationMinutes: 12,
    xpReward: 150,
    status: 'locked',
    pathOffset: 0.3
  },
  {
    id: 'g-n-3.3-ear',
    levelNumber: 3,
    moduleId: 'mod-3.3',
    moduleTitle: 'Module 3.3: Ear Gym & Fretboard Navigation',
    nodeIndex: 15,
    title: 'Ear Gym: Major vs Minor Chord Triad Recognition',
    subtitle: 'Bonus: Distinguish happy major vs melancholic minor chord voicings',
    type: 'ear_gym',
    earGymQuestionId: 'ear-guitar-triad-quality',
    durationMinutes: 2,
    xpReward: 120,
    status: 'locked',
    pathOffset: 0.7
  },
  {
    id: 'g-n-3.3-boss',
    levelNumber: 3,
    moduleId: 'mod-3.3',
    moduleTitle: 'Module 3.3: Ear Gym & Fretboard Navigation',
    nodeIndex: 16,
    title: 'Level 3 Boss: Fingerstyle Accompaniment & Barre Transitions',
    subtitle: 'Boss Milestone: Rapid Bm & F# barre shifts with acoustic Travis picking',
    type: 'boss',
    exerciseId: 'guitar-l3-boss',
    tutorialId: 'tut-g-3.1',
    durationMinutes: 15,
    xpReward: 500,
    status: 'locked',
    bossTier: true,
    bossBadge: 'Level 3 Barre Virtuoso',
    pathOffset: 0.0
  },

  // --- LEVEL 4 ---
  {
    id: 'g-n-4.1-tut',
    levelNumber: 4,
    moduleId: 'mod-4.1',
    moduleTitle: 'Module 4.1: CAGED & Triad Inversions',
    nodeIndex: 17,
    title: 'CAGED Fretboard Mapping & Top-3 Triads',
    subtitle: 'Tutorial: Connect 5 interlocking chord positions across 12 frets',
    type: 'tutorial',
    tutorialId: 'tut-g-4.1',
    durationMinutes: 6,
    xpReward: 110,
    status: 'locked',
    pathOffset: -0.6
  },
  {
    id: 'g-n-4.1-prac',
    levelNumber: 4,
    moduleId: 'mod-4.1',
    moduleTitle: 'Module 4.1: CAGED & Triad Inversions',
    nodeIndex: 18,
    title: 'Top-3 Strings Triad Inversion Ladder',
    subtitle: 'Practice: Root, 1st, and 2nd inversions up the neck on strings 1-2-3',
    type: 'practice',
    exerciseId: 'guitar-l4-ex1',
    tutorialId: 'tut-g-4.1',
    durationMinutes: 15,
    xpReward: 180,
    status: 'locked',
    pathOffset: -0.2
  },
  {
    id: 'g-n-4.2-prac',
    levelNumber: 4,
    moduleId: 'mod-4.2',
    moduleTitle: 'Module 4.2: Expressive Lead Techniques',
    nodeIndex: 19,
    title: 'Precision Whole-Step Bending (+200 Cents)',
    subtitle: 'Practice: Real-time pitch graph verification for whole-step bends',
    type: 'practice',
    exerciseId: 'guitar-l4-ex2',
    tutorialId: 'tut-g-4.2',
    durationMinutes: 15,
    xpReward: 200,
    status: 'locked',
    pathOffset: 0.3
  },
  {
    id: 'g-n-4.3-boss',
    levelNumber: 4,
    moduleId: 'mod-4.3',
    moduleTitle: 'Module 4.3: Modes & Speed Drills',
    nodeIndex: 20,
    title: 'Level 4 Boss: High-Tempo Lead Solo with Bends & Modal Runs',
    subtitle: 'Boss Milestone: 110 BPM Dorian and Mixolydian lead track evaluation',
    type: 'boss',
    exerciseId: 'guitar-l4-boss',
    tutorialId: 'tut-g-4.3',
    durationMinutes: 18,
    xpReward: 750,
    status: 'locked',
    bossTier: true,
    bossBadge: 'Level 4 Modal Maestro',
    pathOffset: 0.0
  },

  // --- LEVEL 5 ---
  {
    id: 'g-n-5.1-tut',
    levelNumber: 5,
    moduleId: 'mod-5.1',
    moduleTitle: 'Module 5.1: Advanced Mechanics',
    nodeIndex: 21,
    title: 'Virtuoso Mechanics: Sweep Picking & Tapping',
    subtitle: 'Tutorial: Synchronized 5-string sweep rakes and extended chords',
    type: 'tutorial',
    tutorialId: 'tut-g-5.1',
    durationMinutes: 7,
    xpReward: 150,
    status: 'locked',
    pathOffset: -0.6
  },
  {
    id: 'g-n-5.1-prac1',
    levelNumber: 5,
    moduleId: 'mod-5.1',
    moduleTitle: 'Module 5.1: Advanced Mechanics',
    nodeIndex: 22,
    title: '5-String Sweep Arpeggios & Two-Hand Tapping',
    subtitle: 'Practice: 120 BPM clean string rakes with zero acoustic bleed',
    type: 'practice',
    exerciseId: 'guitar-l5-ex1',
    tutorialId: 'tut-g-5.1',
    durationMinutes: 20,
    xpReward: 250,
    status: 'locked',
    pathOffset: -0.2
  },
  {
    id: 'g-n-5.1-prac2',
    levelNumber: 5,
    moduleId: 'mod-5.1',
    moduleTitle: 'Module 5.1: Advanced Mechanics',
    nodeIndex: 23,
    title: 'Modern Chord Voicings: Maj9, Min11 & Altered Dominants',
    subtitle: 'Practice: Wide 4-fret stretch jazz voicings with voice leading',
    type: 'practice',
    exerciseId: 'guitar-l5-ex2',
    tutorialId: 'tut-g-5.1',
    durationMinutes: 18,
    xpReward: 250,
    status: 'locked',
    pathOffset: 0.4
  },
  {
    id: 'g-n-5.2-boss',
    levelNumber: 5,
    moduleId: 'mod-5.2',
    moduleTitle: 'Module 5.2: Professional Performance',
    nodeIndex: 24,
    title: 'Level 5 Final Boss: Complete Concert Solo Performance',
    subtitle: 'Mastery Milestone: Multimodal AI pose and pitch scoring over modulating keys',
    type: 'boss',
    exerciseId: 'guitar-l5-boss',
    tutorialId: 'tut-g-5.2',
    durationMinutes: 25,
    xpReward: 1500,
    status: 'locked',
    bossTier: true,
    bossBadge: 'VIBEX Guitar Grandmaster',
    pathOffset: 0.0
  }
];

export const PRACTICE_NODES_MAP: Record<InstrumentType, PracticeNode[]> = {
  guitar: GUITAR_PRACTICE_NODES,
  piano: [
    {
      id: 'p-n-1.1',
      levelNumber: 1,
      moduleId: 'mod-p1.1',
      moduleTitle: 'Module 1.1: Posture & Hand Shape',
      nodeIndex: 1,
      title: 'Seated Bench Balance & Curved Hand Arch',
      subtitle: 'Hold tennis ball curve and straight wrist alignment',
      type: 'tutorial',
      durationMinutes: 5,
      xpReward: 50,
      status: 'completed',
      stars: 3,
      accuracyScore: 96,
      pathOffset: -0.5
    },
    {
      id: 'p-n-1.2',
      levelNumber: 1,
      moduleId: 'mod-p1.2',
      moduleTitle: 'Module 1.2: 5-Finger Pattern',
      nodeIndex: 2,
      title: 'C Major 5-Finger Independence Pattern',
      subtitle: 'Finger 1-2-3-4-5-4-3-2-1 with metronome at 60 BPM',
      type: 'practice',
      exerciseId: 'piano-t1-ex1',
      durationMinutes: 8,
      xpReward: 80,
      status: 'active',
      pathOffset: 0.3
    },
    {
      id: 'p-n-1.3-ear',
      levelNumber: 1,
      moduleId: 'mod-p1.3',
      moduleTitle: 'Module 1.3: Ear Training',
      nodeIndex: 3,
      title: 'Ear Gym: C Major Triad Harmonic Recognition',
      subtitle: 'Identify root position consonance',
      type: 'ear_gym',
      earGymQuestionId: 'ear-1',
      durationMinutes: 2,
      xpReward: 60,
      status: 'locked',
      pathOffset: 0.7
    },
    {
      id: 'p-n-1.4-boss',
      levelNumber: 1,
      moduleId: 'mod-p1.4',
      moduleTitle: 'Module 1.4: Repertoire Boss',
      nodeIndex: 4,
      title: 'Level 1 Boss: Ode to Joy Two-Hand Coordination',
      subtitle: 'Right hand melody with left hand single-note bass',
      type: 'boss',
      exerciseId: 'piano-t1-ex2',
      durationMinutes: 12,
      xpReward: 250,
      status: 'locked',
      bossTier: true,
      bossBadge: 'Level 1 Piano Virtuoso',
      pathOffset: 0.0
    }
  ],
  violin: [
    {
      id: 'v-n-1.1',
      levelNumber: 1,
      moduleId: 'mod-v1.1',
      moduleTitle: 'Module 1.1: Collarbone Balance',
      nodeIndex: 1,
      title: 'Hands-Free Collarbone Balance & Relaxed Jaw',
      subtitle: 'Support violin weight without left hand squeeze',
      type: 'tutorial',
      durationMinutes: 5,
      xpReward: 50,
      status: 'completed',
      stars: 3,
      accuracyScore: 97,
      pathOffset: -0.5
    },
    {
      id: 'v-n-1.2',
      levelNumber: 1,
      moduleId: 'mod-v1.2',
      moduleTitle: 'Module 1.2: Straight Bow Highway',
      nodeIndex: 2,
      title: 'Open D & A String 4-Count Long Bows',
      subtitle: 'Keep bow hair strictly parallel to bridge',
      type: 'practice',
      exerciseId: 'violin-t1-ex1',
      durationMinutes: 8,
      xpReward: 80,
      status: 'active',
      pathOffset: 0.3
    },
    {
      id: 'v-n-1.3-ear',
      levelNumber: 1,
      moduleId: 'mod-v1.3',
      moduleTitle: 'Module 1.3: Ear Gym',
      nodeIndex: 3,
      title: 'Ear Gym: Perfect 5th Open String Tuning Interval',
      subtitle: 'Identify 7-semitone string leap',
      type: 'ear_gym',
      earGymQuestionId: 'ear-3',
      durationMinutes: 2,
      xpReward: 60,
      status: 'locked',
      pathOffset: 0.7
    },
    {
      id: 'v-n-1.4-boss',
      levelNumber: 1,
      moduleId: 'mod-v1.4',
      moduleTitle: 'Module 1.4: First Position Boss',
      nodeIndex: 4,
      title: 'Level 1 Boss: Twinkle Variations & String Crossings',
      subtitle: 'Clean intonation on high-2 finger pattern',
      type: 'boss',
      exerciseId: 'violin-t1-ex2',
      durationMinutes: 12,
      xpReward: 250,
      status: 'locked',
      bossTier: true,
      bossBadge: 'Level 1 Violin Bowmaster',
      pathOffset: 0.0
    }
  ],
  bansuri: [
    {
      id: 'b-n-1.1',
      levelNumber: 1,
      moduleId: 'mod-b1.1',
      moduleTitle: 'Module 1.1: Embouchure & Tone',
      nodeIndex: 1,
      title: 'Diaphragmatic Breath & Lip Aperture',
      subtitle: 'Focus air stream at 45 degree angle across blowhole',
      type: 'tutorial',
      durationMinutes: 5,
      xpReward: 50,
      status: 'completed',
      stars: 3,
      accuracyScore: 98,
      pathOffset: -0.5
    },
    {
      id: 'b-n-1.2',
      levelNumber: 1,
      moduleId: 'mod-b1.2',
      moduleTitle: 'Module 1.2: Swar Sadhana',
      nodeIndex: 2,
      title: 'Sa-Re-Ga Sustained Swar Sadhana',
      subtitle: 'Produce non-airy, resonant tone with Tanpura drone',
      type: 'practice',
      exerciseId: 'bansuri-t1-ex1',
      durationMinutes: 10,
      xpReward: 90,
      status: 'active',
      pathOffset: 0.3
    },
    {
      id: 'b-n-1.3-ear',
      levelNumber: 1,
      moduleId: 'mod-b1.3',
      moduleTitle: 'Module 1.3: Swara Ear Gym',
      nodeIndex: 3,
      title: 'Ear Gym: Pancham (Pa) 3:2 Harmonic Identification',
      subtitle: 'Spot the immutable grounding 5th degree',
      type: 'ear_gym',
      earGymQuestionId: 'ear-2',
      durationMinutes: 2,
      xpReward: 70,
      status: 'locked',
      pathOffset: 0.7
    },
    {
      id: 'b-n-1.4-boss',
      levelNumber: 1,
      moduleId: 'mod-b1.4',
      moduleTitle: 'Module 1.4: Saral Sargam Boss',
      nodeIndex: 4,
      title: 'Level 1 Boss: Complete Bilawal Aroha/Avroha Cycle',
      subtitle: 'Perform 16-beat cycle with 6-hole fleshy pad seal',
      type: 'boss',
      exerciseId: 'bansuri-t1-ex2',
      durationMinutes: 15,
      xpReward: 300,
      status: 'locked',
      bossTier: true,
      bossBadge: 'Level 1 Bansuri Swara Master',
      pathOffset: 0.0
    }
  ]
};
