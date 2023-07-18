'use client';

import {useState, useEffect} from 'react';
import LineGraph from '@/components/LineGraph';
import {ProphetPredictionType, graphDataType} from '@/types/index';

export default function Home(): JSX.Element {
  const [results, setResults] = useState<graphDataType[] | null>(null);
  useEffect(() => {
    async function getResults() {
      const data = await fetch('/api/results/graph');
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
      {results && (
        <>
          <LineGraph data={results} />
        </>
      )}
    </div>
  );
}
