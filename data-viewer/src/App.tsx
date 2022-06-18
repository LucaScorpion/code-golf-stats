import React, { useEffect, useState } from 'react';
import './App.css';
import { getData, Question } from './data';
import { LanguageFrequency } from './charts/LanguageFrequency';

export const App: React.FC = () => {
  const [rawData, setRawData] = useState<Question[]>();

  useEffect(() => {
    getData().then(setRawData);
  }, []);

  if (!rawData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Code Golf Stats</h1>
      <LanguageFrequency rawData={rawData} />
    </div>
  );
};
