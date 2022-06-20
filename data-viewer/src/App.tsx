import React, { useEffect, useState } from 'react';
import './App.scss';
import { getData, GolfData } from './data';
import { LanguageFrequency } from './charts/LanguageFrequency';
import { ExternalLink } from './components/ExternalLink';
import { ByteSizes } from './charts/ByteSizes';

export const App: React.FC = () => {
  const [data, setData] = useState<GolfData>();

  useEffect(() => {
    getData().then(setData);
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
      {!data
        ? <h2>Loading the data...</h2>
        : (
          <>
            <LanguageFrequency data={data} />
            <ByteSizes data={data} />
          </>
        )}
    </div>
  );
};
