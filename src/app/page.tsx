'use client';

import {useState, useEffect} from 'react';
import type React from 'react';
import Header from '@/components/Header';
import LineGraph from '@/components/LineGraph';
import LoadingSpinner from '@/components/LoadingSpinner';
import {graphDataType} from '@/types/index';

export default function Home(): React.JSX.Element {
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
  if (!results) return <div className="text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-900 p-4">Error loading data</div>;

  return (
    <div className="p-0 m-0 overflow-hidden h-full min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <div className="flex-1 flex flex-col min-h-0">
        <LineGraph data={results} />
      </div>
    </div>
  );
}
