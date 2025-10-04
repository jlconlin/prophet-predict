'use client';

import {useState, useEffect} from 'react';
import LineGraph from '@/components/LineGraph';
import LoadingSpinner from '@/components/LoadingSpinner';
import MobileLegend from '@/components/MobileLegend';
import {graphDataType} from '@/types/index';

export default function Home(): JSX.Element {
  const [results, setResults] = useState<graphDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getResults() {
      try {
        const data = await fetch('/api/results/graph');
        const json = await data.json();
        setResults(json);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getResults();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!results) return <div>Error loading data</div>;

  return (
    <div
      style={{
        padding: '0',
        margin: '0',
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LineGraph data={results} />
      <MobileLegend data={results} />
    </div>
  );
}
