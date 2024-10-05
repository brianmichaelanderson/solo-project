// import React from "react";  no longer needed since run-time : automatic preset is configured in .babelrc
import { useState } from 'react';
import LookupResponse from "./LookupResponse";

const NumberLookup = () => {
    const [inputData, setInputData] = useState(''); //state for holding user input
    const [apiData, setApiData] = useState(null); //state for returned API data
    const [error, setError] = useState(null); //state to handle errors sent from API response

    const handleInputChange = (event) => {
        setInputData(event.target.value); // update state/inputData with each character typed in
    };

    // future enhancement:  Confirm only numbers are entered and no more than 11 digits
    // auto enter/add leading 1 to every number entry if only 10 digits entered.
    // confirm first number is a 1 if 11 digits are entered.
    const handleCurrentSubmit = () => {
        // alert(`User Input: ${inputData}`); // place holder.  Update/Replace with fetch to api
        // Sending GET request to the API.  Needs to go to Node Express full URL for the api route/router.
        fetch(`http://localhost:3000/api/lookup?number=${inputData}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('NumberLookup.jsx - Network response error (not ok)');
            }
            return response.json();  //return the json data from the response
        })
        .then(data => {  //look up to understand diff between response & data
            setApiData(data)
            console.log('NumberLookup.jsx - Fetched data from API: ', data);
            // if (data) {
            //     console.log(data);  // have a look at response data output
            // } else {
            //     console.warn('No data received');
            //     alert('NumberLookup Alert: No data received for the provided number.');
            // }
            // setInputData(''); // clear input field
        })
        .catch(error => {
            setError('NumberLookup.jsx - Error fetching data from API'); //render error
            console.error('NumberLookup.jsx - Error fetching data from API:', error);
            alert('NumberLookup.jsx Alert: An error occurred while fetching data')
        })
    };

    return (
        <div>
            <input
            type="text"
            value={inputData}
            onChange={handleInputChange} //Capture user input
            placeholder="enter 1 + 10 digits"
            />
            <button onClick={handleCurrentSubmit}>Submit</button><br />
            {apiData && <div><b>Current Lookup Result: </b><br /> <LookupResponse apiData={apiData}/> </div>}     {/* // render LookupResponse component here destructuring out apiData properties within the LookupResponse component */}
            {error && <div style={{ color: 'red'}}>{error}</div>}
        </div>
    )
}

export default NumberLookup;

// {JSON.stringify(apiData)}  // removed from && conditional render
