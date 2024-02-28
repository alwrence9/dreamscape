import React, { useState } from 'react';
import Sleep from './Sleep.js';
import Dream from './Dream.js';
import Diet from './Diet.js';
import Profile from './Profile.js';
import Mental from './Mental.js';
import HomePage from './HomePage.js';
import LoginForm from './Login.js';
import SignupForm from './Signup.js';

function Navigation() {

  const handleLogin = () => {
    setLoginClicked(true);
    setSignupClicked(false);
    setSelectedComponent(<LoginForm />);
  };

  const handleSignup = () => {
    setSignupClicked(true);
    setLoginClicked(false);
    setSelectedComponent(<SignupForm />);
  };

  const [selectedComponent, setSelectedComponent] = useState(
    <HomePage handleSignup={handleSignup} handleLogin={handleLogin} />
  );
  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);

  return (
    <div>
      <header>
        <nav>
          <h1 onClick={() => setSelectedComponent(<HomePage handleSignup={handleSignup} handleLogin={handleLogin} />)}>
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
