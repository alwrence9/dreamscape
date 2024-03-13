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
  
  };

  async function fetchEntries() {
    var email = JSON.parse(localStorage.getItem("token")).email;
    const url = `/api/v1/dreams/${email}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const res = await response.json();
      setEntries(res.dreams);
      }
    } catch (e) {
      setMessage(e);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);
  
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

      <p>{resultText}</p>

      <details>
        <summary>View past dream entries</summary>
        <section>{entries.map((entry)=> {return <section  key={entry.title}>
            <p>{entry.title}</p>
            <p>{entry.date.string}</p>
            <p>{entry.description}</p>
          </section>
       })}</section>
      </details>
    </>
  );
}

export default Dream;