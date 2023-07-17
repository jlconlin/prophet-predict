'use client';

import {useState, useEffect} from 'react';
import LineGraph from '@/components/LineGraph';
import {ProphetPredictionType, graphDataType} from '@/types/index';

export default function Home(): JSX.Element {
  const [results, setResults] = useState<ProphetPredictionType | null>(null);
  const [graphData, setGraphData] = useState<graphDataType[]>([]);
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

  useEffect(() => {
    if (!results?.candidates) return;
    const tempGraphData: any = [];
    const today: Date = new Date();
    for (const candidate of results.candidates) {
      const data: {x: string; y: number}[] = [];
      for (let i = 1; i < 6000; i++) {
        if (!(i === 1 || i % 90 === 0)) continue;
        let futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        data.push({
          x: futureDate.toISOString().split('T')[0],
          y: candidate.dailyProphetProbabilities[i].probabilityProphet,
        });
      }
      tempGraphData.push({
        id: candidate.name,
        data,
      });
    }
    console.log('debug2', tempGraphData);
    setGraphData(tempGraphData);
  }, [results]);

  return (
    <div>
      {results && (
        <>
          <LineGraph data={graphData} />
        </>
      )}
    </div>
  );
}
