import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function SignupForm({setToken}) {
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
          setMessage('Signed in successfully');
          // New info posted - updates the status in parent component
          //handlePostStatus(true);
          //TO DO: LOG USER IN AUTOMATICALLY WHEN THEY SIGN UP OR LEAD THEM TO LOGIN PAGE

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

  
  //GOOGLE HANDLING METHODS
  const handleLogin = async response => {
    const resp = await fetch('/auth', {
      method : 'POST',
      body: JSON.stringify({
            "token" : response.credential
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    });
    if (resp.ok) {
      const token = await resp.json();
      localStorage.setItem("token", token);
      setToken(token);
    }
  }

  const handleError = error => {
    alert("Error logging in");
  }

  const protectedRoute = async () => {
    const response = await fetch("/protected");
    if (response.status === 200) {
      alert("You are authorized to see this!");
    } else if (response.status === 401)  {
      alert("You are not authorized to see this!");
    } else {
      alert("Something went wrong!");
    }
  }

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