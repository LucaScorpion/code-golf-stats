import React, { useState } from 'react';
import { Question } from '../data';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

export interface Props {
  rawData: Question[];
}

interface LanguageCount {
  language: string;
  count: number;
}

export const LanguageFrequency: React.FC<Props> = ({ rawData }) => {
  const [data] = useState<LanguageCount[]>(() => {
    const counts: Record<string, number> = {};
    rawData
      .flatMap((q) => q.answers)
      .forEach((a) => {
        const prevCount = counts[a.language] || 0;
        counts[a.language] = prevCount + 1;
      });
    return Object
      .entries(counts)
      .reduce<LanguageCount[]>((acc, cur) => [...acc, ({ language: cur[0], count: cur[1] })], [])
      .sort((a, b) => b.count - a.count);
  });

  return (
    <div>
      <h2>Language Frequency</h2>
      <BarChart data={data} width={600} height={300}>
        <XAxis dataKey="language" />
        <YAxis />
        <Tooltip labelClassName="tooltip-label" />
        <Bar dataKey="count" />
      </BarChart>
      <div className="row">
        <div>
          <h3>Most Used</h3>
          <ol>
            {data.slice(0, 10).map((d) => (
              <li key={d.language}>{d.language} ({d.count})</li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Least Used</h3>
          <ol>
            {data.slice(data.length - 10).reverse().map((d) => (
              <li key={d.language}>{d.language} ({d.count})</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
