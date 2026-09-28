/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InstrumentCurriculum, BansuriScale, EarTrainingQuestion } from '../types/vibex';

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
      'Fretboard navigation & fret wire proximity',
      'Fingertip pressure & perpendicular knuckle arch',
      'Primary & advanced open chord shapes',
      'F-shape & B-shape barre chords',
      'Strumming patterns & syncopated accents',
      'Travis picking & fingerstyle mechanics',
      'Minor pentatonic boxes & modal soloing',
    ],
    levels: [
      {
        levelNumber: 1,
        title: 'Tier 1: Absolute Beginner',
        tierName: 'Absolute Beginner',
        durationSpan: 'Weeks 1–4',
        dailyPracticeMinutes: '30–45 min/day',
        focusSummary: 'Instrument hold, open string tuning, primary open chords (E minor, A minor, C major), basic down-strumming rhythm.',
        outcome: 'Hold guitar comfortably, play Em, Am, C, G, D chords cleanly, and strum 4/4 songs without pause.',
        accentColor: '#FF8066',
        requiredXp: 0,
        unlocked: true,
        completed: true,
        completionPercent: 100,
        dailyRoutine: [
          { activity: 'Spider walk finger independence (frets 1-2-3-4)', minutes: 5 },
          { activity: 'Open string plucking (E-A-D-G-B-E)', minutes: 5 },
          { activity: 'Open chords (Em, Am, C, G, D)', minutes: 15 },
          { activity: 'Song practice: Knockin on Heaven’s Door', minutes: 15 },
        ],
        repertoireMilestones: [
          { title: 'Knockin on Heaven’s Door (G–D–Am / Em)', artistOrComposer: 'Bob Dylan', type: 'Contemporary/Pop', keyOrRaga: 'G Major', tempoBpm: 65 },
          { title: 'Horse with No Name (Em–D6)', artistOrComposer: 'America', type: 'Contemporary/Pop', keyOrRaga: 'E Minor', tempoBpm: 72 },
          { title: 'Tum Hi Ho (Simplified Em–C–G–D)', artistOrComposer: 'Aashiqui 2', type: 'Indian/Hindi', keyOrRaga: 'E Minor', tempoBpm: 66 },
        ],
        exercises: [
          {
            id: 'guitar-t1-ex1',
            title: 'Spider Walk (1-2-3-4 Finger Independence Drill)',
            subtitle: 'Place fingers 1, 2, 3, 4 on frets 1, 2, 3, 4 across all 6 strings',
            durationMinutes: 6,
            difficulty: 1,
            goal: 'Build individual finger control without lifting earlier fingers prematurely.',
            category: 'technique',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'Chromatic',
            notes: [
              { id: 'g-t1-1', name: 'F1', frequency: 87.31, durationMs: 800, fret: 1, stringIndex: 0, finger: 1, startTimeMs: 0 },
              { id: 'g-t1-2', name: 'F#1', frequency: 92.50, durationMs: 800, fret: 2, stringIndex: 0, finger: 2, startTimeMs: 800 },
              { id: 'g-t1-3', name: 'G1', frequency: 98.00, durationMs: 800, fret: 3, stringIndex: 0, finger: 3, startTimeMs: 1600 },
              { id: 'g-t1-4', name: 'G#1', frequency: 103.83, durationMs: 800, fret: 4, stringIndex: 0, finger: 4, startTimeMs: 2400 },
            ],
            postureGuidance: {
              ideal: 'Thumb rests flat behind the neck opposite fret 2. Keep fingers arched like claws.',
              commonMistakes: ['Thumb wrapping completely over neck choking movement', 'Fingers collapsing flat on neighboring strings'],
              correctiveTip: 'Arch proximal knuckles 90 degrees to fret with pure tip pads.'
            }
          },
          {
            id: 'guitar-t1-ex2',
            title: 'Open E Minor to C Major Cadence',
            subtitle: 'Smooth two-finger pivot into 3-finger C chord',
            durationMinutes: 10,
            difficulty: 1,
            goal: 'Switch between Em and C in under 1 beat without breaking strum tempo.',
            category: 'chords_triads',
            tempoBpm: 65,
            timeSignature: '4/4',
            keySignature: 'E Minor',
            notes: [
              { id: 'g-t1-5', name: 'E2', frequency: 82.41, durationMs: 1000, fret: 0, stringIndex: 0, finger: 0, startTimeMs: 0 },
              { id: 'g-t1-6', name: 'B2', frequency: 123.47, durationMs: 1000, fret: 2, stringIndex: 1, finger: 1, startTimeMs: 1000 },
              { id: 'g-t1-7', name: 'E3', frequency: 164.81, durationMs: 1000, fret: 2, stringIndex: 2, finger: 2, startTimeMs: 2000 },
              { id: 'g-t1-8', name: 'C4', frequency: 261.63, durationMs: 2000, fret: 1, stringIndex: 4, finger: 1, startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Keep middle finger close to string 4 as an anchor when pivoting to C major.',
              commonMistakes: ['Lifting entire fretting hand into the air when switching chords', 'Muting high E string with ring finger'],
              correctiveTip: 'Move index finger right behind fret wire 1 on string 2 (B string).'
            }
          }
        ]
      },
      {
        levelNumber: 2,
        title: 'Tier 2: Early Intermediate',
        tierName: 'Early Intermediate',
        durationSpan: 'Months 2–4',
        dailyPracticeMinutes: '45–60 min/day',
        focusSummary: 'Full open chord library, strumming variations, hammer-ons, pull-offs, minor pentatonic scale Box 1.',
        outcome: 'Play Travis picking patterns (P-I-M-A) and improvise lead licks with A minor pentatonic.',
        accentColor: '#FF8066',
        requiredXp: 300,
        unlocked: true,
        completed: false,
        completionPercent: 35,
        dailyRoutine: [
          { activity: 'Travis picking pattern on G & C chords', minutes: 12 },
          { activity: 'A Minor Pentatonic Box 1 with metronome', minutes: 12 },
          { activity: 'Hammer-on & pull-off articulation drills', minutes: 10 },
          { activity: 'Repertoire: Wish You Were Here / Tum Se Hi', minutes: 20 },
        ],
        repertoireMilestones: [
          { title: 'Wish You Were Here (Acoustic Intro)', artistOrComposer: 'Pink Floyd', type: 'Western/Classical', keyOrRaga: 'G Major / Em', tempoBpm: 60 },
          { title: 'Californication Solo (Box 1 Intro)', artistOrComposer: 'Red Hot Chili Peppers', type: 'Contemporary/Pop', keyOrRaga: 'A Minor Pentatonic', tempoBpm: 88 },
          { title: 'Tum Se Hi (Fingerpicked Verse)', artistOrComposer: 'Pritam / Jab We Met', type: 'Indian/Hindi', keyOrRaga: 'C–G–Am–F', tempoBpm: 76 },
        ],
        exercises: [
          {
            id: 'guitar-t2-ex1',
            title: 'A Minor Pentatonic Scale (Box 1, 5th Fret)',
            subtitle: '5-8, 5-7, 5-7, 5-7, 5-8, 5-8 alternate pick strokes',
            durationMinutes: 10,
            difficulty: 2,
            goal: 'Perform Box 1 ascending and descending cleanly at 70 BPM with alternate picking.',
            category: 'scales_alankars',
            tempoBpm: 70,
            timeSignature: '4/4',
            keySignature: 'A Minor Pentatonic',
            notes: [
              { id: 'g-t2-1', name: 'A2', frequency: 110.00, durationMs: 600, fret: 5, stringIndex: 0, finger: 1, startTimeMs: 0 },
              { id: 'g-t2-2', name: 'C3', frequency: 130.81, durationMs: 600, fret: 8, stringIndex: 0, finger: 4, startTimeMs: 600 },
              { id: 'g-t2-3', name: 'D3', frequency: 146.83, durationMs: 600, fret: 5, stringIndex: 1, finger: 1, startTimeMs: 1200 },
              { id: 'g-t2-4', name: 'E3', frequency: 164.81, durationMs: 600, fret: 7, stringIndex: 1, finger: 3, startTimeMs: 1800 },
              { id: 'g-t2-5', name: 'G3', frequency: 196.00, durationMs: 600, fret: 5, stringIndex: 2, finger: 1, startTimeMs: 2400 },
              { id: 'g-t2-6', name: 'A3', frequency: 220.00, durationMs: 1200, fret: 7, stringIndex: 2, finger: 3, startTimeMs: 3000 },
            ],
            postureGuidance: {
              ideal: 'Fret right behind the metal fret wire. Keep picking hand wrist resting lightly on bridge saddle.',
              commonMistakes: ['Reaching with pinky without shifting thumb anchor', 'Only picking downstrokes'],
              correctiveTip: 'Alternate strictly: Down, Up, Down, Up across strings.'
            }
          }
        ]
      },
      {
        levelNumber: 3,
        title: 'Tier 3: Intermediate',
        tierName: 'Intermediate',
        durationSpan: 'Months 5–8',
        dailyPracticeMinutes: '60–90 min/day',
        focusSummary: 'F-shape and B-shape Barre chords, fingerstyle patterns, palm muting, full fretboard pentatonic integration.',
        outcome: 'Clamp full 6-string and 5-string barre chords cleanly; execute string bends and vibrato over blues progressions.',
        accentColor: '#FF8066',
        requiredXp: 800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Barre chord conditioning (F major & B minor)', minutes: 15 },
          { activity: 'Full fretboard pentatonic boxes 1–5 connection', minutes: 20 },
          { activity: 'String bending & vibrato mechanics', minutes: 15 },
          { activity: 'Repertoire: Hotel California / Ae Dil Hai Mushkil', minutes: 25 },
        ],
        repertoireMilestones: [
          { title: 'Hotel California (Acoustic Intro & Barre Arpeggios)', artistOrComposer: 'The Eagles', type: 'Contemporary/Pop', keyOrRaga: 'Bm–F#–A–E', tempoBpm: 72 },
          { title: 'Comfortably Numb (First Solo Bends)', artistOrComposer: 'David Gilmour / Pink Floyd', type: 'Western/Classical', keyOrRaga: 'B Minor Pentatonic', tempoBpm: 65 },
          { title: 'Ae Dil Hai Mushkil (Barre Dynamics)', artistOrComposer: 'Pritam / Arijit Singh', type: 'Indian/Hindi', keyOrRaga: 'C#m–A–E–B', tempoBpm: 78 },
        ],
        exercises: [
          {
            id: 'guitar-t3-ex1',
            title: 'Full F-Major Barre Chord (E-Shape at Fret 1)',
            subtitle: 'Index finger outer bone roll across all 6 strings with thumb center support',
            durationMinutes: 12,
            difficulty: 3,
            goal: 'Sound all 6 strings clearly without buzzing G or B strings.',
            category: 'chords_triads',
            tempoBpm: 60,
            timeSignature: '4/4',
            keySignature: 'F Major',
            notes: [
              { id: 'g-t3-1', name: 'F2', frequency: 87.31, durationMs: 1000, fret: 1, stringIndex: 0, finger: 1, startTimeMs: 0 },
              { id: 'g-t3-2', name: 'C3', frequency: 130.81, durationMs: 1000, fret: 3, stringIndex: 1, finger: 3, startTimeMs: 1000 },
              { id: 'g-t3-3', name: 'F3', frequency: 174.61, durationMs: 1000, fret: 3, stringIndex: 2, finger: 4, startTimeMs: 2000 },
              { id: 'g-t3-4', name: 'A3', frequency: 220.00, durationMs: 1000, fret: 2, stringIndex: 3, finger: 2, startTimeMs: 3000 },
              { id: 'g-t3-5', name: 'C4', frequency: 261.63, durationMs: 1000, fret: 1, stringIndex: 4, finger: 1, startTimeMs: 4000 },
              { id: 'g-t3-6', name: 'F4', frequency: 349.23, durationMs: 1500, fret: 1, stringIndex: 5, finger: 1, startTimeMs: 5000 },
            ],
            postureGuidance: {
              ideal: 'Roll index finger slightly onto its bony side edge. Pull backward from shoulder leverage rather than pinching thumb.',
              commonMistakes: ['Soft fleshy pad muting inside strings', 'Thumb creeping over headstock'],
              correctiveTip: 'Keep thumb in the vertical center of the back of the neck.'
            }
          }
        ]
      },
      {
        levelNumber: 4,
        title: 'Tier 4: Advanced',
        tierName: 'Advanced',
        durationSpan: 'Months 9–15',
        dailyPracticeMinutes: '90–120 min/day',
        focusSummary: 'Major/minor modes, string bending, vibrato mechanics, triad inversions, dynamic rhythm playing.',
        outcome: 'Improvise modal lines (Dorian, Mixolydian) and master sweep picking over extended 7th & 9th chords.',
        accentColor: '#FF8066',
        requiredXp: 1600,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Modal soloing (D Dorian & G Mixolydian)', minutes: 25 },
          { activity: 'Sweep picking arpeggio shapes (D & A major)', minutes: 25 },
          { activity: 'Dynamic rhythm (funk syncopation & reggae skank)', minutes: 20 },
          { activity: 'Repertoire: Sweet Child O’ Mine / Nadaan Parindey', minutes: 35 },
        ],
        repertoireMilestones: [
          { title: 'Sweet Child O’ Mine (Lead Solo & Runs)', artistOrComposer: 'Guns N’ Roses', type: 'Contemporary/Pop', keyOrRaga: 'Eb Tuning / D-Shape', tempoBpm: 125 },
          { title: 'Stairway to Heaven (Full Solo & Fingerstyle)', artistOrComposer: 'Led Zeppelin', type: 'Contemporary/Pop', keyOrRaga: 'A Minor', tempoBpm: 82 },
          { title: 'Nadaan Parindey (Emotional Dorian Lead)', artistOrComposer: 'A.R. Rahman / Rockstar', type: 'Indian/Hindi', keyOrRaga: 'E Minor / Dorian', tempoBpm: 90 },
        ],
        exercises: [
          {
            id: 'guitar-t4-ex1',
            title: 'Dorian Mode Soloing & Precision Full-Step Bends',
            subtitle: 'Bend 7th fret 3rd string up to pitch of 9th fret using fingers 2 & 3 for support',
            durationMinutes: 14,
            difficulty: 4,
            goal: 'Lock bent pitch exactly to target note without sharp or flat pitch overshoot.',
            category: 'technique',
            tempoBpm: 75,
            timeSignature: '4/4',
            keySignature: 'D Dorian',
            notes: [
              { id: 'g-t4-1', name: 'D4', frequency: 293.66, durationMs: 800, fret: 7, stringIndex: 2, finger: 3, startTimeMs: 0 },
              { id: 'g-t4-2', name: 'E4 (Bent)', frequency: 329.63, durationMs: 1500, fret: 9, stringIndex: 2, finger: 3, startTimeMs: 800 },
              { id: 'g-t4-3', name: 'B3', frequency: 246.94, durationMs: 800, fret: 9, stringIndex: 3, finger: 3, startTimeMs: 2300 },
            ],
            postureGuidance: {
              ideal: 'Rotate fretting wrist like turning a doorknob; do not push from finger tendons alone.',
              commonMistakes: ['Bending with isolated index finger without supporting fingers', 'Under-bending 15 cents flat'],
              correctiveTip: 'Keep fingers 1 and 2 directly behind ring finger 3 to reinforce bending force.'
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
        focusSummary: 'Sweep picking, complex chord voicings (9ths, 11ths, 13ths), high-speed lead solos, live tone setup and performance.',
        outcome: 'Perform full 2-hour set with professional tone shaping, chord-melody arrangements, and hybrid picking mastery.',
        accentColor: '#FF8066',
        requiredXp: 2800,
        unlocked: false,
        completed: false,
        completionPercent: 0,
        dailyRoutine: [
          { activity: 'Hybrid picking (pick + fingers) & tapping', minutes: 30 },
          { activity: 'Jazz chord melody & 13th extensions', minutes: 35 },
          { activity: 'DAW tone shaping (EQ, compressor, IR cab)', minutes: 30 },
          { activity: 'Live performance repertoire runs (Sultans of Swing)', minutes: 45 },
        ],
        repertoireMilestones: [
          { title: 'Sultans of Swing (Fingerpicked Leads)', artistOrComposer: 'Dire Straits', type: 'Contemporary/Pop', keyOrRaga: 'D Minor', tempoBpm: 148 },
          { title: 'Cliffs of Dover (Hybrid Picking Intro)', artistOrComposer: 'Eric Johnson', type: 'Contemporary/Pop', keyOrRaga: 'G Major Pentatonic', tempoBpm: 190 },
          { title: 'Kun Faya Kun (Sufi Ornamented Lead)', artistOrComposer: 'Rockstar Live', type: 'Indian/Hindi', keyOrRaga: 'Bhairav Modal Fusion', tempoBpm: 80 },
        ],
        exercises: [
          {
            id: 'guitar-t5-ex1',
            title: 'Sweep Picking 5-String Arpeggio Cascade',
            subtitle: 'One fluid continuous pick stroke with instantaneous left-hand finger release',
            durationMinutes: 18,
            difficulty: 5,
            goal: 'Execute 5-string sweep at 130 BPM with zero string bleed or overlapping resonance.',
            category: 'repertoire',
            tempoBpm: 130,
            timeSignature: '4/4',
            keySignature: 'D Major',
            notes: [
              { id: 'g-t5-1', name: 'D3', frequency: 146.83, durationMs: 300, fret: 5, stringIndex: 1, finger: 1, startTimeMs: 0 },
              { id: 'g-t5-2', name: 'F#3', frequency: 185.00, durationMs: 300, fret: 4, stringIndex: 2, finger: 2, startTimeMs: 300 },
              { id: 'g-t5-3', name: 'A3', frequency: 220.00, durationMs: 300, fret: 2, stringIndex: 3, finger: 1, startTimeMs: 600 },
              { id: 'g-t5-4', name: 'D4', frequency: 293.66, durationMs: 300, fret: 3, stringIndex: 4, finger: 2, startTimeMs: 900 },
              { id: 'g-t5-5', name: 'F#4', frequency: 369.99, durationMs: 600, fret: 2, stringIndex: 5, finger: 1, startTimeMs: 1200 },
            ],
            postureGuidance: {
              ideal: 'Pick glides across strings like a brush; lift fretting finger the instant note sounds to prevent ringing.',
              commonMistakes: ['Strumming all strings into a chord rather than sequential single-note sweeps', 'Tense pick grip'],
              correctiveTip: 'Keep pick angled slightly inward so it slices smoothly across strings.'
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
  }
];
