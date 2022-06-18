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

export async function getData(): Promise<Question[]> {
  const response = await fetch(`${baseUrl}${dataFiles[0]}`);
  if (response.status !== 200) {
    throw new Error(`Unexpected status code ${response.status}.`);
  }
  return response.json();
}
