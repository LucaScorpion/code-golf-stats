#!/usr/bin/env node
import fetch from 'node-fetch';

const baseUrl = 'https://api.stackexchange.com/2.3';
const codeGolfSite = 'codegolf';

async function apiCall(path, params) {
  const totalParams = new URLSearchParams({
    site: codeGolfSite,
    ...params,
  });
  const response = await fetch(`${baseUrl}${path}?${totalParams}`);
  const body = await response.json();
  if (response.status >= 300) {
    console.error(body);
    throw new Error(`API returned status ${body}`);
  }
  return body;
}

function getQuestions() {
  // https://api.stackexchange.com/docs/questions
  return apiCall('/questions', {
    filter: '!nKzQUR3Egv',
    sort: 'month',
    // pagesize: 100,
  });
}

function getAnswers(questionId) {
  // https://api.stackexchange.com/docs/answers-on-questions
  return apiCall(`/questions/${questionId}/answers`, {
    filter: '!nKzQURF6Y5',
    pagesize: 100,
  });
}

const questions = await getQuestions();
console.log(questions.items[0]);

const answers = await getAnswers(questions.items[0].question_id);
console.log(answers.items[0]);
