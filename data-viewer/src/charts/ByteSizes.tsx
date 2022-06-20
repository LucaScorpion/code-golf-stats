import React, { useState } from 'react';
import { GolfData } from '../data';
import { AnswerLink } from '../components/AnswerLink';

export interface Props {
  data: GolfData;
}

interface SizesByLanguage {
  language: string;
  minSize: number;
  maxSize: number;
  avgSize: number;
}

export const ByteSizes: React.FC<Props> = ({ data }) => {
  const [sizes] = useState<SizesByLanguage[]>(() =>
    data.languageAnswers.map((l) => {
      const bytes = l.answers.map((a) => a.bytes);
      return ({
        language: l.language,
        minSize: bytes.reduce((acc, cur) => acc < cur ? acc : cur),
        maxSize: bytes.reduce((acc, cur) => acc > cur ? acc : cur),
        avgSize: bytes.reduce((acc, cur) => acc + cur) / l.answers.length,
      });
    }),
  );
  const [answersByLength] = useState(() => data.answers.sort((a, b) => b.bytes - a.bytes));
  const [zeroByteLangs] = useState<string[]>(() =>
    data.languageAnswers
      .filter((l) => l.answers.findIndex((a) => a.bytes === 0) > -1)
      .map((l) => l.language),
  );

  return (
    <div>
      <h2>Byte Sizes</h2>
      <div className="row">
        <div>
          <h3>Longest Solutions</h3>
          <ol>
            {answersByLength.slice(0, 10).map((a) => (
              <li key={a.answerId}>
                <AnswerLink answerId={a.answerId}>
                  {a.bytes} bytes ({a.language})
                </AnswerLink>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Languages with Zero-Byte Solutions</h3>
          <ul>
            {zeroByteLangs.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
