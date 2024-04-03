import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Signup.css';
import SHA256 from 'crypto-js/sha256';

function hash(text){
  return SHA256(text).toString()
}

function SignupForm({setToken, handleLogin, handleError, setDefaultComponent}) {
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
          body: JSON.stringify({ email, "password": hash(password), firstname, lastname }),
        });
  
        if (response.ok) {
          setMessage('Account created! Please go back to login');
          const token = await response.json();
          localStorage.setItem("token", token);
          setToken(token);
          setDefaultComponent();
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
      <section id="signup-form">
        <fieldset>
          <legend><h1> Signup </h1></legend>
          <form onSubmit={handleSubmit}>
            <div>
              <div id="label-container">
                <label>Email:</label>
                <label>Password:</label>
                <label>First name:</label>
                <label>Last name:</label>
              </div>
              <div id="input-container">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
          </div>
          <div id="login-buttons">
            <button type="submit">Submit</button>
            <div className="App">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={handleError}        
              />
            </div>
          </div>
          </form>
          <p>{resultText}</p>
      </fieldset>
    </section>
  );
}

export default SignupForm;