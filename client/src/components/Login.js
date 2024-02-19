import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [resultText, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if both username and comment are not empty
    if (email.trim() !== '' && password.trim() !== '' && firstname.trim() !== '' && lastname.trim() !== '') {
      try {
        const response = await fetch('/api/v1/profile/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, firstname, lastname }),
        });
  
        if (response.ok) {
          setMessage('Comment submitted successfully');
          // New info posted - updates the status in parent component
          //handlePostStatus(true);
          //TO DO: LOG USER IN AUTOMATICALLY WHEN THEY SIGN UP OR LEAD THEM TO LOGIN PAGE
        } else {
          setMessage('Failed to submit comment');
        }
      } catch (error) {
        setMessage('Error:', error);
      }
    }
    else {
      setMessage('Username and comment can not be empty');
    }
  };

    return (
    <>
      <form>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
          Password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
          First name:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
          Last name:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>

      </form>
      <p>{resultText}</p>
    </>
  );
}

export default LoginForm;