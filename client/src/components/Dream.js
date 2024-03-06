import React, { useState } from 'react';

function Dream() {
  const [title, setTitle] = useState('Title');
  const [description, setDescription] = useState('Write all about your dreams here!');
  const [date, setDate] = useState('');
  var email = JSON.parse(localStorage.getItem("token")).email;

  //For logging in regularly
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Check if both username and comment are not empty
    if (title.trim() !== '' && description.trim() !== '') {
      try {
        const response = await fetch('/api/v1/entries/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, date, title, description }),
        });
  
        if (response.ok) {
          
          //Get authentication token
          var token = await response.json();
        } 
        else {
          //setMessage('Error response')
        }
      } catch (error) {
        //setMessage('Error:', error);
      }
    }
    else {
      //setMessage('Enter both username and password');
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
          onChange={(e) => setDate(e.target.value)}
          required/>

        <textarea value={description} 
          onChange={(e) => setDescription(e.target.value)}
          required> </textarea>
          
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default Dream;