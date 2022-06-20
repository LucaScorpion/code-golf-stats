import React, { useEffect, useState } from 'react';
import './App.scss';
import { getData, Question } from './data';
import { LanguageFrequency } from './charts/LanguageFrequency';
import { ExternalLink } from './components/ExternalLink';
import { ByteSizes } from './charts/ByteSizes';

export const App: React.FC = () => {
  const [rawData, setRawData] = useState<Question[]>();

  useEffect(() => {
    getData().then(setRawData);
  }, []);

  return (
    <div className="app">
      <h1>Code Golf Stats</h1>
      <p>
        Based on questions and answers from <ExternalLink href="https://codegolf.stackexchange.com">Code Golf Stack
        Exchange</ExternalLink>.
      </p>
      <p>
        This visualization code, the extraction code, and the generated dataset are available
        on
        GitHub: <ExternalLink href="https://github.com/LucaScorpion/code-golf-stats">LucaScorpion/code-golf-stats</ExternalLink>.
      </p>
      {!rawData
        ? <h2>Loading the data...</h2>
        : (
          <>
            <LanguageFrequency rawData={rawData} />
            <ByteSizes rawData={rawData} />
          </>
        )}
    </div>
  );
};
