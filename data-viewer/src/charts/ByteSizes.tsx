import React, { useState } from 'react';
import { GolfData } from '../data';
import { AnswerLink } from '../components/AnswerLink';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

export interface Props {
  data: GolfData;
}

interface SizesByLanguage {
  language: string;
  count: number;
  minSize: number;
  maxSize: number;
  avgSize: number;
}

export const ByteSizes: React.FC<Props> = ({ data }) => {
  const [sizes] = useState<SizesByLanguage[]>(() =>
    data.languageAnswers
      .map((l) => {
        const bytes = l.answers.map((a) => a.bytes);
        return ({
          language: l.language,
          count: l.answers.length,
          minSize: bytes.reduce((acc, cur) => acc < cur ? acc : cur),
          maxSize: bytes.reduce((acc, cur) => acc > cur ? acc : cur),
          avgSize: Math.round(bytes.reduce((acc, cur) => acc + cur) / l.answers.length),
        });
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  );
  const [answersByLength] = useState(() => [...data.answers].sort((a, b) => b.bytes - a.bytes));

  return (
    <div>
      <h2>Byte Sizes</h2>
      <p>
        The minimum, average, and maximum solution length (y) per language (x) for the top 10 languages.
      </p>
      <BarChart data={sizes} width={600} height={300}>
        <XAxis dataKey="language" interval={0} angle={25} textAnchor="start" height={50} />
        <YAxis />
        <Tooltip labelClassName="tooltip-label" />
        <Bar dataKey="minSize" name="Minimum" />
        <Bar dataKey="avgSize" name="Average" />
        <Bar dataKey="maxSize" name="Maximum" />
      </BarChart>
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
          <h3>Shortest Solutions</h3>
          <ol>
            {answersByLength.slice(answersByLength.length - 10).reverse().map((a) => (
              <li key={a.answerId}>
                <AnswerLink answerId={a.answerId}>
                  {a.bytes} byte{a.bytes === 1 ? '' : 's'} ({a.language})
                </AnswerLink>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
