const baseUrl = 'https://raw.githubusercontent.com/LucaScorpion/code-golf-stats/main/data/';
const dataFiles = [
  'month-2022-06-18.json',
];

export interface Question {
  questionId: number;
  score: number;
  title: string;
  answers: Answer[];
}

export interface Answer {
  questionId: number;
  answerId: number;
  score: number;
  bytes: number;
  language: string;
}

export interface GolfData {
  questions: Question[];
  answers: Answer[];
  languageAnswers: LanguageAnswers[];
}

export interface LanguageAnswers {
  language: string;
  answers: Answer[];
}

async function getQuestions(): Promise<Question[]> {
  const response = await fetch(`${baseUrl}${dataFiles[0]}`);
  if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}.`);
  }
  return response.json();
}

export async function getData(): Promise<GolfData> {
  const questions = await getQuestions();
  const answers = questions.flatMap((q) => q.answers);

  const answersByLanguage: Record<string, Answer[]> = {};
  answers.forEach((a) => {
    if (!answersByLanguage[a.language]) {
      answersByLanguage[a.language] = [];
    }
    answersByLanguage[a.language].push(a);
  });

  const languageAnswers = Object.entries(answersByLanguage)
    .reduce<LanguageAnswers[]>((acc, cur) => ([
      ...acc,
      { language: cur[0], answers: cur[1] },
    ]), [])
    .sort((a, b) => b.answers.length - a.answers.length);

  return {
    questions,
    answers,
    languageAnswers,
  };
}
