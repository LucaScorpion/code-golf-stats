#!/usr/bin/env node
import fetch from 'node-fetch';
import * as fs from 'node:fs/promises';
import 'dotenv/config';
import {parse} from 'node-html-parser';

// API info.
const baseUrl = 'https://api.stackexchange.com/2.3';
const codeGolfSite = 'codegolf';
const maxPageSize = 100;

// Skip questions with these tags.
const skipQuestionTags = [
  'cops-and-robbers',
  'king-of-the-hill',
  'polyglot',
  'popularity-contest',
];

const apiKey = process.env.SE_API_KEY;
if (!apiKey) {
  console.error('No API key given, please make sure SE_API_KEY is set.');
  process.exit(1);
}

async function apiCall(path, params) {
  const totalParams = new URLSearchParams({
    ...params,
    site: codeGolfSite,
    key: apiKey,
  });
  const response = await fetch(`${baseUrl}${path}?${totalParams}`);
  const body = await response.json();
  if (response.status >= 300) {
    console.error(body);
    throw new Error(`API returned status ${response.status}.`);
  }
  return body;
}

async function getQuestions() {
  // https://api.stackexchange.com/docs/questions
  return (await apiCall('/questions', {
    filter: '!nKzQUR3Egv',
    tagged: 'code-golf',
    sort: 'month',
    pagesize: maxPageSize,
  })).items;
}

function getAnswers(questionId, page) {
  // https://api.stackexchange.com/docs/answers-on-questions
  return apiCall(`/questions/${questionId}/answers`, {
    filter: '!nKzQURF6Y5',
    pagesize: maxPageSize,
    page,
  });
}

async function getAllAnswers(questionId) {
  const result = [];

  let page = 0;
  let hasMore = true;
  while (hasMore) {
    page++;
    const response = await getAnswers(questionId, page);
    result.push(...response.items);
    hasMore = response.has_more;
  }

  return result;
}

function extractAnswerInfo(answer) {
  const html = parse(answer.body);
  const heading = html.querySelector('h1');

  if (!heading) {
    console.error(`Could not find heading: https://codegolf.stackexchange.com/a/${answer.answer_id}`);
    return undefined;
  }

  const rawTitle = heading.text;
  const [rawLanguage] = rawTitle.split(',', 2);

  // Get the language.
  // Notes:
  // - Sometimes people put extra info in brackets "()", so discard anything after "(".
  let language = rawLanguage;
  if (language.includes('(')) {
    language = language.substring(0, language.indexOf('('));
  }
  language = language.trim();

  // Get the N in "N byte(s)" from the title.
  // Edge cases:
  // - Don't check for the trailing "s", since it can also be "1 byte".
  // - Sometimes people don't put "bytes" at all, or put other info there. I've chosen to ignore those answers.
  const bytes = parseInt((rawTitle.match(/(\d+) +byte/i) || [])[1], 10);

  if (Number.isNaN(bytes) || !language) {
    console.error(`Could not extract answer info: https://codegolf.stackexchange.com/a/${answer.answer_id}`);
    console.error(rawTitle);
    return;
  }

  return {
    rawTitle,
    questionId: answer.question_id,
    answerId: answer.answer_id,
    score: answer.score,
    bytes,
    language,
  };
}

function getQuestionInfo(question) {
  return {
    questionId: question.question_id,
    score: question.score,
    title: question.title,
    answers: [],
  };
}

console.log('Getting questions.');
const allQuestions = await getQuestions();
console.log(`Got ${allQuestions.length} questions.`);

console.log('Filtering question tags.');
const questions = allQuestions.filter((q) => {
  // Check if the question includes the code-golf tag.
  if (!q.tags.includes('code-golf')) {
    return false;
  }

  // Check if the question includes a tag we want to skip.
  for (const tag of skipQuestionTags) {
    if (q.tags.includes(tag)) {
      return false;
    }
  }
  return true;
});
console.log(`Got ${questions.length} filtered questions.`);

const data = questions.map(getQuestionInfo);
for (const q of data) {
  console.log(`Getting answers for question ${q.questionId}.`);
  q.answers = (await getAllAnswers(q.questionId)).map(extractAnswerInfo).filter((a) => !!a);
}

const todayString = new Date().toISOString().split('T')[0];
const dataFile = `./data/month-${todayString}.json`;
console.log(`Writing to ${dataFile}`);
await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
console.log('Done!');
