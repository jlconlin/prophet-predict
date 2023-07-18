'use client';

import {useState, useEffect} from 'react';
import LineGraph from '@/components/LineGraph';
import {graphDataType} from '@/types/index';

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

  if (!results) return <></>;

  return (
    <div>
      <LineGraph data={results} />
    </div>
  );
}
