import React, { useEffect, useState } from 'react';
import './App.scss';
import { getData, Question } from './data';
import { LanguageFrequency } from './charts/LanguageFrequency';
import { ExternalLink } from './components/ExternalLink';

export const App: React.FC = () => {
  const [rawData, setRawData] = useState<Question[]>();

  useEffect(() => {
    getData().then(setRawData);
  }, []);

  if (!rawData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1>Code Golf Stats</h1>
      <p>
        Based on questions and answers from <ExternalLink href="https://codegolf.stackexchange.com">Code Golf Stack
        Exchange</ExternalLink>.
      </p>
      <LanguageFrequency rawData={rawData} />
    </div>
  );
};
