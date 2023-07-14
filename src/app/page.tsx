'use client';

import {useState, useEffect} from 'react';
import {ProphetPredictionType} from '@/types/index';

export default function Home(): JSX.Element {
  const [results, setResults] = useState<ProphetPredictionType>({
    candidates: [],
  });
  useEffect(() => {
    async function getResults() {
      const data = await fetch('/api/results');
      const json = await data.json();
      setResults(json);
    }
    getResults();
  }, []);

  useEffect(() => {
    console.log('debug1', results);
  }, [results]);

  return (
    <div>
      {results.candidates.map((candidate, index) => {
        return <div key={index}>{candidate.name}</div>;
      })}
    </div>
  );
}
