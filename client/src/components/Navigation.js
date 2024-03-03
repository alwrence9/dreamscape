import React, { useState, useEffect } from 'react';
import Sleep from './Sleep.js';
import Dream from './Dream.js';
import Diet from './Diet.js';
import Profile from './Profile.js';
import Mental from './Mental.js';
import HomePage from './HomePage.js';
import LoginForm from './Login.js';
import SignupForm from './Signup.js';

function Navigation() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setLoginClicked(true);
    setSignupClicked(false);
    setSelectedComponent(<LoginForm setToken={setToken}/>);
  };

  const handleSignup = () => {
    setSignupClicked(true);
    setLoginClicked(false);
    setSelectedComponent(<SignupForm setToken={setToken}/>);
  };

  const handleLogout = async () => {
    const session = token;
    var resp = await fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session }),
    });
    if (resp.ok) {
      setToken();
      setLoggedOut(true);
      localStorage.clear();
      setSelectedComponent(
        <>
          <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
          <button onClick={() => handleLogin(true)}> Login </button> 
          <button onClick={() => handleSignup(true)}> Signup </button>
        </>)
    }
  }

  const [selectedComponent, setSelectedComponent] = useState(
    <>
      <HomePage handleSignup={handleSignup} handleLogin={handleLogin} token={token} />
      <button onClick={() => handleLogin(true)}> Login </button> 
      <button onClick={() => handleSignup(true)}> Signup </button>
    </>
  );
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // useEffect(()=> {
  //   let mounted = true;
  //   fetch('/protected').then((resp) => {
  //     if (resp.status === 200) {
  //       return resp.json().then((data)=> {

  //       })
  //     }
  //     else {
  //       return resp.json();
  //     }
  //   });
  //   return () => mounted = false;
  // }, [])

  return (
    <div>
      <header>
        <nav>
          <h1 onClick={() => { 
              if (!token) {
                setSelectedComponent(
                <>
                  <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
                  <button onClick={() => handleLogin(true)}> Login </button> 
                  <button onClick={() => handleSignup(true)}> Signup </button>
                </>)
              }
              else {
                setSelectedComponent(<><HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
                  <button onClick={() => handleLogout()}> Logout </button></>)
              }
            } }>
            Triple Z is Cooking!
          </h1>
          <ul>
            <li onClick={() => setSelectedComponent(<Profile />)}>Profile</li>
            <li onClick={() => setSelectedComponent(<Diet />)}>Diet</li>
            <li onClick={() => setSelectedComponent(<Dream />)}>Dream</li>
            <li onClick={() => setSelectedComponent(<Sleep />)}>Sleep</li>
            <li onClick={() => setSelectedComponent(<Mental />)}>Mentality</li>
          </ul>
        </nav>
      </header>
      <section>{selectedComponent}</section>
    </div>
  );
}

export default Navigation;
