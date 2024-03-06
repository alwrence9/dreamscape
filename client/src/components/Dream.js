import React, { useState } from 'react';

function Dream() {
  const [resultText, setMessage] = useState('');

  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Write all about your dreams here!');
  const [dateValue, setDate] = useState('');

  //For logging in regularly
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Check if both title and description are not empty
    if (title.trim() !== '' && description.trim() !== '') {

      //Structuring date like this so it is easier to sort entries by order in the future
      const date = { "string": dateValue, "sinceEpoch": new Date(dateValue).getTime() }
      //Getting email from local storage
      var email = JSON.parse(localStorage.getItem("token")).email;

      //Adding new dream entry to api
      try {
        const response = await fetch('/api/v1/dreams/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, date, title, description }),
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
  
    return (
    <>
      <h1> Dream </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required/>

        <input type="date"
          onChange={(e) => {setDate(e.target.value);
          console.log(dateValue);}}
          required/>

        <textarea value={description} 
          onChange={(e) => setDescription(e.target.value)}> </textarea>

        <button type="submit">Save</button>
      </form>

      <p>{resultText}</p>
    </>
  );
}

export default Dream;