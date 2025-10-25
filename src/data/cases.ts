export interface CaseData {
  case: string;
  questions: string;
  description: string;
}

export const cases: CaseData[] = [
  { case: 'Nominativ', questions: 'Tko? Što?', description: 'Who? What?' },
  { case: 'Genitiv', questions: '(od) koga? (od) čega?', description: 'From whom? From what?' },
  { case: 'Dativ', questions: 'Komu? Čemu?', description: 'To whom? To what?' },
  { case: 'Akuzativ', questions: 'Koga? Što?', description: 'Whom? What?' },
  { case: 'Vokativ', questions: '(obraćanje)', description: 'Direct address' },
  { case: 'Lokativ', questions: '(o) komu? (o) čemu?', description: 'About whom? About what?' },
  { case: 'Instrumental', questions: '(s) kim(e)? (s) čim(e)?', description: 'With whom? With what?' }
];

export const getCaseEnglishName = (caseName: string): string => {
  const caseTranslations: { [key: string]: string } = {
    'Nominativ': 'Nominative',
    'Genitiv': 'Genitive',
    'Dativ': 'Dative',
    'Akuzativ': 'Accusative',
    'Vokativ': 'Vocative',
    'Lokativ': 'Locative',
    'Instrumental': 'Instrumental'
  };
  return caseTranslations[caseName] || caseName;
};
