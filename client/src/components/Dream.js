import React, { useState, useEffect } from 'react';
import './Dream.css';

function Dream() {
  const [resultText, setMessage] = useState('');

  const [entries, setEntries] = useState([]);

  const [title, setTitle] = useState('Title');
  const [optionalDescription, setDescription] = useState('Write all about your dreams here!');
  const [dateValue, setDate] = useState('');
  //Getting email from local storage
  var email = JSON.parse(localStorage.getItem("token")).email;

  //For logging in regularly
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Check if both title and description are not empty
    if (title.trim() !== '' && optionalDescription.trim() !== '') {

      //Structuring date like this so it is easier to sort entries by order in the future
      const date = { "string": dateValue, "sinceEpoch": new Date(dateValue).getTime() }

      //Adding new dream entry to api
      try {
        const response = await fetch('/api/v1/dreams/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, date, title, optionalDescription }),
        });
  
        if (response.ok) {
          setMessage('Added new dream entry!');
        } 
        else {
          setMessage('Error response from server')
        }
      } catch (error) {
        setMessage('Error:', error);
      }
    }
    else {
      setMessage('Enter both username and password');
    }

    useEffect(()=> {
      const fetchEntries = async () => {
        try {
          const response = await fetch(`/api/v1/dreams/${email}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setEntries(data);
          }
        } catch (error) {
          setMessage('Error:', error);
        }
      }

      fetchEntries();
    }, []);
  
  };
  
    return (
    <>
      <h1> Dream </h1>
      <form onSubmit={handleSubmit} className="journal-entry">
        <input type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required/>

        <input type="date"
          onChange={(e) => setDate(e.target.value)}
          required/>

        <textarea value={optionalDescription} 
          onChange={(e) => setDescription(e.target.value)}> </textarea>

        <button type="submit">Save</button>
      </form>

      <details>
        <summary>This section is for dream entries</summary>
        <p>{entries}</p>
      </details>

      <section>{entries.map((entry)=> {return <p key={entry.title}>entry</p> })}</section>
    </>
  );
}

export default Dream;