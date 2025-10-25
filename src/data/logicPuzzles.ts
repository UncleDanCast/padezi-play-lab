/**
 * Logic Grid Puzzles for Croatian Case Learning
 * 25 hand-crafted puzzles progressing from easy to hard
 * Focus: Teaching Croatian grammatical cases through logical deduction
 */

export interface Noun {
  croatian: string;
  english: string;
}

export interface Case {
  name: string;
  question: string;
  description: string;
}

export interface Puzzle {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  nouns: Noun[];
  cases: Case[];
  solution: Record<string, string>;
  clues: string[];
  educationalFocus: string;
}

export const logicPuzzles: Puzzle[] = [
  // EASY PUZZLES (1-8)
  {
    id: 1,
    difficulty: 'easy',
    nouns: [
      { croatian: 'majka', english: 'mother' },
      { croatian: 'otac', english: 'father' },
      { croatian: 'brat', english: 'brother' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject of sentence' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession, origin' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'majka': 'Nominativ',
      'otac': 'Genitiv',
      'brat': 'Akuzativ'
    },
    clues: [
      "Majka is in the nominative case (Tko?/Što?)",
      "The genitive case (Koga?/Čega?) is not used for brat",
      "When you say 'I see my brother', you use accusative case",
      "Otac answers the question 'Koga?' in this puzzle",
      "The accusative case is not used for majka"
    ],
    educationalFocus: 'Basic case identification with familiar nouns'
  },
  {
    id: 2,
    difficulty: 'easy',
    nouns: [
      { croatian: 'pas', english: 'dog' },
      { croatian: 'mačka', english: 'cat' },
      { croatian: 'ptica', english: 'bird' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'pas': 'Akuzativ',
      'mačka': 'Nominativ',
      'ptica': 'Genitiv'
    },
    clues: [
      "Mačka is the subject of the sentence (Tko?/Što?)",
      "The genitive case describes the bird in this puzzle",
      "Pas is NOT in the nominative case",
      "When you say 'I walk the dog', pas is in accusative",
      "Ptica does not use the accusative case here"
    ],
    educationalFocus: 'Direct object vs. subject recognition'
  },
  {
    id: 3,
    difficulty: 'easy',
    nouns: [
      { croatian: 'škola', english: 'school' },
      { croatian: 'kuća', english: 'house' },
      { croatian: 'grad', english: 'city' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'škola': 'Genitiv',
      'kuća': 'Akuzativ',
      'grad': 'Nominativ'
    },
    clues: [
      "Grad answers 'Što?' as the subject (nominative)",
      "The accusative case is used for kuća",
      "Škola is NOT in the nominative case",
      "When expressing possession or origin, you use genitive with škola",
      "Kuća is NOT in the genitive case"
    ],
    educationalFocus: 'Inanimate objects with cases'
  },
  {
    id: 4,
    difficulty: 'easy',
    nouns: [
      { croatian: 'kruh', english: 'bread' },
      { croatian: 'voda', english: 'water' },
      { croatian: 'meso', english: 'meat' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession/partitive' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'kruh': 'Akuzativ',
      'voda': 'Nominativ',
      'meso': 'Genitiv'
    },
    clues: [
      "Voda is in the nominative case",
      "Kruh answers the question 'Što?' as a direct object",
      "The genitive case is used for meso (to show 'some meat')",
      "Kruh is NOT in the genitive case",
      "Meso is NOT in the nominative case",
      "When you say 'I eat bread', kruh is in accusative"
    ],
    educationalFocus: 'Concrete objects and case usage'
  },
  {
    id: 5,
    difficulty: 'easy',
    nouns: [
      { croatian: 'učitelj', english: 'teacher' },
      { croatian: 'liječnik', english: 'doctor' },
      { croatian: 'student', english: 'student' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'učitelj': 'Genitiv',
      'liječnik': 'Nominativ',
      'student': 'Akuzativ'
    },
    clues: [
      "Liječnik is the subject of the sentence (Tko?)",
      "Student is NOT in the genitive case",
      "When you see or meet someone, you use accusative - this applies to student",
      "Učitelj answers 'Koga?' in this puzzle",
      "The nominative case is NOT used for učitelj"
    ],
    educationalFocus: 'Animate nouns with case distinctions'
  },
  {
    id: 6,
    difficulty: 'easy',
    nouns: [
      { croatian: 'more', english: 'sea' },
      { croatian: 'planina', english: 'mountain' },
      { croatian: 'rijeka', english: 'river' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Origin/description' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'more': 'Nominativ',
      'planina': 'Akuzativ',
      'rijeka': 'Genitiv'
    },
    clues: [
      "More answers 'Što?' as the subject",
      "Planina is NOT in the nominative case",
      "The genitive case describes rijeka here",
      "When traveling to a place, you use accusative - applies to planina",
      "Rijeka is NOT in the accusative case",
      "The genitive case is NOT used for more"
    ],
    educationalFocus: 'Abstract and concrete noun cases'
  },
  {
    id: 7,
    difficulty: 'easy',
    nouns: [
      { croatian: 'knjiga', english: 'book' },
      { croatian: 'stol', english: 'table' },
      { croatian: 'prozor', english: 'window' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'knjiga': 'Akuzativ',
      'stol': 'Genitiv',
      'prozor': 'Nominativ'
    },
    clues: [
      "Prozor is in the nominative case (subject)",
      "Knjiga is NOT in the nominative case",
      "The genitive case is used to show 'of the table' (stol)",
      "When you read or buy something, use accusative - applies to knjiga",
      "Stol does NOT use the accusative case"
    ],
    educationalFocus: 'Common vocabulary with case practice'
  },
  {
    id: 8,
    difficulty: 'easy',
    nouns: [
      { croatian: 'ruka', english: 'hand' },
      { croatian: 'glava', english: 'head' },
      { croatian: 'noga', english: 'leg/foot' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'ruka': 'Genitiv',
      'glava': 'Akuzativ',
      'noga': 'Nominativ'
    },
    clues: [
      "Noga is the subject (Tko?/Što?)",
      "Ruka shows possession in this puzzle (genitive)",
      "Glava is NOT in the nominative case",
      "When something hurts, you say 'Boli me ___' with accusative - applies to glava",
      "Ruka is NOT in the accusative case"
    ],
    educationalFocus: 'Inalienable possession and cases'
  },

  // MEDIUM PUZZLES (9-18)
  {
    id: 9,
    difficulty: 'medium',
    nouns: [
      { croatian: 'auto', english: 'car' },
      { croatian: 'vlak', english: 'train' },
      { croatian: 'avion', english: 'airplane' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Indirect object, to/toward' }
    ],
    solution: {
      'auto': 'Dativ',
      'vlak': 'Nominativ',
      'avion': 'Akuzativ'
    },
    clues: [
      "Vlak is the subject of the sentence",
      "The dative case (Kome?/Čemu?) is used when going 'toward' something - applies to auto",
      "Avion is NOT in the dative case",
      "When boarding or entering a vehicle, you use accusative with avion",
      "Auto answers 'Čemu?' in this puzzle",
      "Vlak is NOT in the accusative case"
    ],
    educationalFocus: 'Introduction of dative case'
  },
  {
    id: 10,
    difficulty: 'medium',
    nouns: [
      { croatian: 'haljina', english: 'dress' },
      { croatian: 'cipele', english: 'shoes' },
      { croatian: 'kaput', english: 'coat' }
    ],
    cases: [
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Giving to' }
    ],
    solution: {
      'haljina': 'Akuzativ',
      'cipele': 'Dativ',
      'kaput': 'Genitiv'
    },
    clues: [
      "Kaput shows possession or description (genitive)",
      "Cipele is NOT in the accusative case",
      "The dative case is used when giving something to someone - cipele answers 'Čemu?'",
      "When you wear or put on clothing, use accusative - applies to haljina",
      "Haljina is NOT in the genitive case"
    ],
    educationalFocus: 'Accusative vs. dative with objects'
  },
  {
    id: 11,
    difficulty: 'medium',
    nouns: [
      { croatian: 'kiša', english: 'rain' },
      { croatian: 'sunce', english: 'sun' },
      { croatian: 'snijeg', english: 'snow' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Descriptive' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Toward/attribution' }
    ],
    solution: {
      'kiša': 'Genitiv',
      'sunce': 'Nominativ',
      'snijeg': 'Dativ'
    },
    clues: [
      "Sunce is the subject answering 'Što?'",
      "Kiša is NOT in the nominative case",
      "The dative case attributes something to snijeg (Čemu?)",
      "Snijeg is NOT in the genitive case",
      "When describing 'of rain' or 'from rain', use genitive with kiša",
      "Sunce does NOT use the dative case"
    ],
    educationalFocus: 'Abstract nouns with varied cases'
  },
  {
    id: 12,
    difficulty: 'medium',
    nouns: [
      { croatian: 'sreća', english: 'happiness' },
      { croatian: 'ljubav', english: 'love' },
      { croatian: 'tuga', english: 'sadness' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Expressing lack/abundance' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object/emotion felt' }
    ],
    solution: {
      'sreća': 'Nominativ',
      'ljubav': 'Akuzativ',
      'tuga': 'Genitiv'
    },
    clues: [
      "Sreća is the subject of the sentence",
      "The genitive case expresses 'full of sadness' - applies to tuga",
      "Ljubav is NOT in the nominative case",
      "When you feel an emotion directly, use accusative - applies to ljubav",
      "Tuga does NOT use the accusative case"
    ],
    educationalFocus: 'Abstract nouns requiring careful case usage'
  },
  {
    id: 13,
    difficulty: 'medium',
    nouns: [
      { croatian: 'kuhinja', english: 'kitchen' },
      { croatian: 'soba', english: 'room' },
      { croatian: 'kupaonica', english: 'bathroom' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Movement to' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Movement toward' }
    ],
    solution: {
      'kuhinja': 'Akuzativ',
      'soba': 'Nominativ',
      'kupaonica': 'Dativ'
    },
    clues: [
      "Soba is the subject (Što?)",
      "Kuhinja is NOT in the dative case",
      "When entering a space, you use accusative - applies to kuhinja",
      "Kupaonica answers 'Čemu?' (toward what?)",
      "The dative case is used for kupaonica",
      "Soba is NOT in the accusative case"
    ],
    educationalFocus: 'Locative preparation (using dativ/akuzativ)'
  },
  {
    id: 14,
    difficulty: 'medium',
    nouns: [
      { croatian: 'gitara', english: 'guitar' },
      { croatian: 'klavir', english: 'piano' },
      { croatian: 'bubanj', english: 'drum' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Possession' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Giving/toward' }
    ],
    solution: {
      'gitara': 'Genitiv',
      'klavir': 'Dativ',
      'bubanj': 'Nominativ'
    },
    clues: [
      "Bubanj is in the nominative case",
      "Gitara shows possession (whose guitar? - genitive)",
      "Klavir is NOT in the nominative case",
      "The dative case is used when approaching or learning 'toward' an instrument - applies to klavir",
      "Gitara is NOT in the dative case"
    ],
    educationalFocus: 'Instrumental case introduction hint'
  },
  {
    id: 15,
    difficulty: 'medium',
    nouns: [
      { croatian: 'jabuka', english: 'apple' },
      { croatian: 'kruška', english: 'pear' },
      { croatian: 'banana', english: 'banana' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Partitive (some of)' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'jabuka': 'Akuzativ',
      'kruška': 'Nominativ',
      'banana': 'Genitiv'
    },
    clues: [
      "Kruška is the subject",
      "Jabuka is NOT in the nominative case",
      "The genitive case expresses 'some bananas' - applies to banana",
      "When eating fruit as a direct object, use accusative - applies to jabuka",
      "Banana is NOT in the accusative case",
      "Kruška does NOT use the genitive case"
    ],
    educationalFocus: 'Partitive genitive with food'
  },
  {
    id: 16,
    difficulty: 'medium',
    nouns: [
      { croatian: 'crvena', english: 'red' },
      { croatian: 'plava', english: 'blue' },
      { croatian: 'zelena', english: 'green' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'About what/location' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' }
    ],
    solution: {
      'crvena': 'Lokativ',
      'plava': 'Nominativ',
      'zelena': 'Akuzativ'
    },
    clues: [
      "Plava is in the nominative case",
      "The locative case talks 'about' a color - applies to crvena (O čem?)",
      "Zelena is NOT in the nominative case",
      "When choosing or seeing a color directly, use accusative - applies to zelena",
      "Crvena answers 'O čem?' (about what?)",
      "Plava is NOT in the locative case"
    ],
    educationalFocus: 'Introduction of locative case'
  },
  {
    id: 17,
    difficulty: 'medium',
    nouns: [
      { croatian: 'jutro', english: 'morning' },
      { croatian: 'večer', english: 'evening' },
      { croatian: 'dan', english: 'day' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Time expression' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'About/during' }
    ],
    solution: {
      'jutro': 'Genitiv',
      'večer': 'Lokativ',
      'dan': 'Nominativ'
    },
    clues: [
      "Dan is the subject",
      "Jutro uses genitive to express 'during the morning'",
      "Večer is NOT in the nominative case",
      "The locative case talks 'about the evening' - applies to večer",
      "Jutro is NOT in the locative case"
    ],
    educationalFocus: 'Temporal expressions with cases'
  },
  {
    id: 18,
    difficulty: 'medium',
    nouns: [
      { croatian: 'nogomet', english: 'soccer/football' },
      { croatian: 'košarka', english: 'basketball' },
      { croatian: 'tenis', english: 'tennis' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object (playing)' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'Talking about' }
    ],
    solution: {
      'nogomet': 'Akuzativ',
      'košarka': 'Lokativ',
      'tenis': 'Nominativ'
    },
    clues: [
      "Tenis is in the nominative case",
      "Nogomet is NOT in the nominative case",
      "When playing a sport, use accusative - applies to nogomet",
      "The locative case discusses 'about basketball' - applies to košarka",
      "Košarka answers 'O čem?'",
      "Tenis is NOT in the locative case"
    ],
    educationalFocus: 'Activity nouns with multiple cases'
  },

  // HARD PUZZLES (19-25)
  {
    id: 19,
    difficulty: 'hard',
    nouns: [
      { croatian: 'djed', english: 'grandfather' },
      { croatian: 'sestra', english: 'sister' },
      { croatian: 'unuk', english: 'grandson' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'With whom/what' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'To whom' }
    ],
    solution: {
      'djed': 'Dativ',
      'sestra': 'Instrumental',
      'unuk': 'Nominativ'
    },
    clues: [
      "Unuk is the subject of the sentence",
      "The instrumental case shows 'with sister' - applies to sestra (S kim?)",
      "Djed is NOT in the nominative case",
      "When giving something to someone, use dative - applies to djed",
      "Sestra answers 'S kim?' (with whom?)",
      "Djed is NOT in the instrumental case"
    ],
    educationalFocus: 'Introduction of instrumental case'
  },
  {
    id: 20,
    difficulty: 'hard',
    nouns: [
      { croatian: 'pravda', english: 'justice' },
      { croatian: 'istina', english: 'truth' },
      { croatian: 'sloboda', english: 'freedom' }
    ],
    cases: [
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Essence/description' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'By means of' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'Concerning' }
    ],
    solution: {
      'pravda': 'Instrumental',
      'istina': 'Lokativ',
      'sloboda': 'Genitiv'
    },
    clues: [
      "Sloboda uses genitive to show 'of freedom'",
      "The locative case discusses 'about truth' - applies to istina",
      "Pravda is NOT in the locative case",
      "When acting 'with justice' or 'by means of justice', use instrumental - applies to pravda",
      "Istina answers 'O čem?'"
    ],
    educationalFocus: 'Complex abstract noun relationships'
  },
  {
    id: 21,
    difficulty: 'hard',
    nouns: [
      { croatian: 'telefon', english: 'phone' },
      { croatian: 'računalo', english: 'computer' },
      { croatian: 'televizija', english: 'television' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject' },
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Direct object' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'Using/with' }
    ],
    solution: {
      'telefon': 'Instrumental',
      'računalo': 'Nominativ',
      'televizija': 'Akuzativ'
    },
    clues: [
      "Računalo is the subject",
      "The instrumental case shows using 'with a phone' - applies to telefon",
      "Televizija is NOT in the nominative case",
      "When watching something, use accusative - applies to televizija",
      "Telefon answers 'S čim?' (with what?)",
      "Računalo is NOT in the instrumental case"
    ],
    educationalFocus: 'All cases with contemporary vocabulary'
  },
  {
    id: 22,
    difficulty: 'hard',
    nouns: [
      { croatian: 'matematika', english: 'mathematics' },
      { croatian: 'povijest', english: 'history' },
      { croatian: 'kemija', english: 'chemistry' }
    ],
    cases: [
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Study of' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'About/concerning' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'By means of' }
    ],
    solution: {
      'matematika': 'Genitiv',
      'povijest': 'Lokativ',
      'kemija': 'Instrumental'
    },
    clues: [
      "Matematika uses genitive as 'study of mathematics'",
      "The locative case talks 'about history' - applies to povijest",
      "Kemija is NOT in the genitive case",
      "When learning 'by means of chemistry', use instrumental",
      "Povijest is NOT in the instrumental case"
    ],
    educationalFocus: 'Multiple case relationships with learning'
  },
  {
    id: 23,
    difficulty: 'hard',
    nouns: [
      { croatian: 'grom', english: 'thunder' },
      { croatian: 'munja', english: 'lightning' },
      { croatian: 'vjetar', english: 'wind' }
    ],
    cases: [
      { name: 'Nominativ', question: 'Tko?/Što?', description: 'Subject/phenomenon occurring' },
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Origin/source' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'Caused by' }
    ],
    solution: {
      'grom': 'Nominativ',
      'munja': 'Instrumental',
      'vjetar': 'Genitiv'
    },
    clues: [
      "Grom is the subject (what occurs)",
      "Munja is NOT in the nominative case",
      "The instrumental case shows causation 'by lightning' - applies to munja",
      "Vjetar uses genitive to show 'of the wind' or 'from the wind'",
      "Vjetar is NOT in the instrumental case",
      "Grom is NOT in the genitive case"
    ],
    educationalFocus: 'Complex natural vocabulary with all cases'
  },
  {
    id: 24,
    difficulty: 'hard',
    nouns: [
      { croatian: 'slika', english: 'painting/picture' },
      { croatian: 'glazba', english: 'music' },
      { croatian: 'ples', english: 'dance' }
    ],
    cases: [
      { name: 'Akuzativ', question: 'Koga?/Što?', description: 'Creating/experiencing' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'Discussing' },
      { name: 'Instrumental', question: 'S kim?/S čim?', description: 'Expressing through' }
    ],
    solution: {
      'slika': 'Akuzativ',
      'glazba': 'Instrumental',
      'ples': 'Lokativ'
    },
    clues: [
      "Slika uses accusative when creating or viewing art",
      "The instrumental case expresses 'through music' - applies to glazba",
      "Ples is NOT in the accusative case",
      "When talking 'about dance', use locative - applies to ples",
      "Glazba is NOT in the locative case"
    ],
    educationalFocus: 'Creative vocabulary with nuanced case usage'
  },
  {
    id: 25,
    difficulty: 'hard',
    nouns: [
      { croatian: 'djetinjstvo', english: 'childhood' },
      { croatian: 'mladost', english: 'youth' },
      { croatian: 'starost', english: 'old age' }
    ],
    cases: [
      { name: 'Genitiv', question: 'Koga?/Čega?', description: 'Period/time of' },
      { name: 'Lokativ', question: 'O kom?/O čem?', description: 'Reflecting on' },
      { name: 'Dativ', question: 'Kome?/Čemu?', description: 'Toward/approaching' }
    ],
    solution: {
      'djetinjstvo': 'Genitiv',
      'mladost': 'Dativ',
      'starost': 'Lokativ'
    },
    clues: [
      "Djetinjstvo uses genitive to express 'time of childhood'",
      "The locative case reflects 'on old age' - applies to starost",
      "Mladost is NOT in the nominative case",
      "The dative case shows movement 'toward youth' - applies to mladost",
      "Starost answers 'O čem?'",
      "Djetinjstvo is NOT in the locative case"
    ],
    educationalFocus: 'Comprehensive case mastery with philosophical nouns'
  }
];
