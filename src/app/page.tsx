'use client';

import {useState, useEffect} from 'react';

export default function Home() {
  const [results, setResults] = useState([]);
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

  return <div>test</div>;
}
