import React, { useEffect, useState } from 'react';
import './App.css';
import { getData, Question } from './data';

export const App: React.FC = () => {
  const [data, setData] = useState<Question[]>();

  useEffect(() => {
    getData().then(setData);
  }, []);

  if (!data) {
    return <div>'Loading...'</div>;
  }

  return (
    <div className="App">
      {data[0].title}
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
