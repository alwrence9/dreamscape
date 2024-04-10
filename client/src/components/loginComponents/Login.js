import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import {HomePage} from '../HomePage.js';
import SHA256 from 'crypto-js/sha256';

function hash(text){
  return SHA256(text).toString()
}


function LoginForm({setToken, handleLogin, handleError, setComponent, handleLogout}) {
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
          body: JSON.stringify({ "email": email, "password": hash(password) }),
        });
  
        if (response.ok) {
          setMessage('Logged in successfully');
          //Get authentication token
          var token = await response.json();
          setToken(token);
          localStorage.setItem("token", token);
          setComponent(<><HomePage /> 
          <section className="home-items">
           <li onClick={() => handleLogout()}> Logout </li>
          </section> </>);
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
      <section id="login-form">
        <fieldset>
          <legend><h1> Login </h1></legend>
          <form onSubmit={handleSubmit}>
            <div>
              <div id="label-container">
                <label>Email:</label>
                <label>Password:</label>
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

export default LoginForm;