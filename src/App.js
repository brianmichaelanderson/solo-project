// import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import NumberLookup from './components/NumberLookup';
import PastLookups from './components/PastLookups';
//import { useState } from "react";

const App = () => {
  const [pastLookups, setPastLookups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then((res) => res.json())
      .then((data) => {
        setPastLookups(data); //update pastLookups state
        setLoading(false); // update loading state
      });
  }, []); //so only renders once on initial page load, right?

  //run console log in useEffect so it only runs AFTER it detects a change to pastLookups state.
  useEffect(() => {
    console.log(
      'App.js - pastLookups state after calling setPastLookups within useEffect: ',
      pastLookups
    );
  }, [pastLookups]); // log when pastLookups state changes

  // loading message if loading state is still false
  if (loading) {
    return <div>Loading...</div>;
  }

    const mappedLookups = pastLookups.results.map((eachLookup, idx) => (<PastLookups key={idx} eachLookup={eachLookup}/>));

  //render SPA components
  return (
    <div>
      <div>Enter 1+10 digit phone number</div>
      <NumberLookup />
      <h3>Past Lookup Results</h3>
      {/* <PastLookups pastLookup={pastLookups.results[0]} /> */}
      {mappedLookups}
    </div>
  );
};

export default App;

{
  /* <h3>Lookup Response</h3>    moved out of App render
  <LookupResponse /> */
}

// // const [loading, setLoading] = useState(false);
// // Don't need useEffect to load NumberLookup component.  Maybe need it for PastLookups.jsx....??
// useEffect(() => {
//     fetch('/api/lookup')
//     .then((res) => res.json())
//     .then((data) => {
//         // pull past records here?  Or make an onClick event to do so?
//         setLoading(false);  // update loading state
//     });
// }, []);  // empty array for no dependency so only loads once

//     // If data still loading show loading message
//     if (loading) {
//         return <div>Loading...</div>;
//     }
