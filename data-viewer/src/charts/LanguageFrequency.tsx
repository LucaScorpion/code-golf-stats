import React, { useState } from 'react';
import { GolfData } from '../data';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

export interface Props {
  data: GolfData;
}

interface LanguageCount {
  language: string;
  count: number;
}

export const LanguageFrequency: React.FC<Props> = ({ data }) => {
  const [counts] = useState<LanguageCount[]>(() => data.languageAnswers.map((l) => ({
    language: l.language,
    count: l.answers.length,
  })));

  return (
    <div>
      <h2>Language Frequency</h2>
      <p>
        The total amount of answers (y) per language (x).
      </p>
      <BarChart data={counts} width={600} height={300}>
        <XAxis dataKey="language" />
        <YAxis />
        <Tooltip labelClassName="tooltip-label" />
        <Bar dataKey="count" name="Count" />
      </BarChart>
      <div className="row">
        <div>
          <h3>Most Used</h3>
          <ol>
            {counts.slice(0, 10).map((d) => (
              <li key={d.language}>{d.language} ({d.count})</li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Least Used</h3>
          <ol>
            {counts.slice(counts.length - 10).reverse().map((d) => (
              <li key={d.language}>{d.language} ({d.count})</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
