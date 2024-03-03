import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function LoginForm({setToken, handleLogin, handleError}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resultText, setMessage] = useState('');

  //For logging in regularly
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Check if both username and comment are not empty
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch('/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          setMessage('Logged in successfully');
          // New info posted - updates the status in parent component
          //handlePostStatus(true);
          //TO DO: LOG USER IN AUTOMATICALLY WHEN THEY SIGN UP OR LEAD THEM TO LOGIN PAGE
          //Get authentication token
          var token = await response.json();
          localStorage.setItem("token", token);
          setToken(token);
        } else {
          setMessage('Failed to login');
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default LoginForm;