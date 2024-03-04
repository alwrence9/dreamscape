import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import LoginForm from './Login.js';

function SignupForm({setToken, handleLogin, handleError, setSelected}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [resultText, setMessage] = useState('');

  //For signing up regularly
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
          setMessage('Signed in successfully');
          setSelected(<LoginForm setToken={setToken} handleLogin={handleLogin} 
            handleError={handleError} setSelected={setSelected}/>);
        } else {
          setMessage('Failed to sign up');
        }
      } catch (error) {
        setMessage('Error:', error);
      }
    }
    else {
      setMessage('None of the fields can be empty');
    }
  };

    return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
        Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
        First name:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
        Last name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{resultText}</p>

      <div className="App">
        <GoogleLogin
          onSuccess={handleLogin}
          onError={handleError}        
        />
      </div>
    </>
  );
}

export default SignupForm;