import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

function App() {
  const [count, setCount] = useState(0)
  const GetEngagements = gql`
  query GetEngagements {
    engagements {
      items {
        endDate
        id
        internalName
        lastApprovedDate
        lastModifiedDate
        name
        programName
        startDate
        status
    }
  }
}
`;
  const { loading, error, data } = useQuery(GetEngagements);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
       // Display the data from the query
      <ul>
        {/* @typescript-eslint/no-explicit-any */},
        {data.engagements.items.map((engagement: any) => (
          <li key={engagement.id}>
            <h2>{engagement.name}</h2>
            <p>Program: {engagement.programName}</p>
            <p>Status: {engagement.status}</p>
            <p>Start Date: {new Date(engagement.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(engagement.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
