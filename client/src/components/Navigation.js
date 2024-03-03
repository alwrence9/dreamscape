import React, { useState, useEffect } from 'react';
import Sleep from './Sleep.js';
import Dream from './Dream.js';
import Diet from './Diet.js';
import Profile from './Profile.js';
import Mental from './Mental.js';
import HomePage from './HomePage.js';
import LoginForm from './Login.js';
import SignupForm from './Signup.js';
import Quiz from './sleepComponents/Quiz.js';
import SleepInfo from './sleepComponents/SleepInfo.js';
import SleepMetrics from './sleepComponents/SleepMetrics.js';
import Support from './sleepComponents/Support.js';

function Navigation() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setLoginClicked(true);
    setSignupClicked(false);
    setSelectedComponent(<LoginForm setToken={setToken} handleLogin={handleGoogleLogin} handleError={handleError}/>);
  };

  const handleSignup = () => {
    setSignupClicked(true);
    setLoginClicked(false);
    setSelectedComponent(<SignupForm setToken={setToken} handleLogin={handleGoogleLogin} handleError={handleError}/>);
  };

  //This ends the user's session and clears local storage so the token isn't there anymore
  const handleLogout = async () => {
    const session = token;
    var resp = await fetch('/api/v1/logout', {
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

  //For google login
  const handleGoogleLogin = async response => {
    const resp = await fetch('/api/v1/googleLogin', {
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
      //Store token so we can then check if a session is going on 
      //Inside of the object there is email and token 
      //(this email can be used to fetch stuff related to profile)
      localStorage.setItem("token", token);
      setToken(token);
      //Redirect to home page once logged in
      setSelectedComponent(<><HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
                  <button onClick={() => handleLogout()}> Logout </button></>);
    }
  }

  const handleError = error => {
    alert("Error logging in");
  }

  const [selectedComponent, setSelectedComponent] = useState(
    <>
      <HomePage handleSignup={handleSignup} handleLogin={handleLogin} token={token} />
      <button onClick={() => handleLogin(true)}> Login </button> 
      <button onClick={() => handleSignup(true)}> Signup </button>
    </>
  );

  const handleQuiz = () => {
    setQuizClicked(true);
    setSignupClicked(false);
    setLoginClicked(false);
    setMetricsClicked(false);
    setInfoClicked(false);
    setSupportClicked(false);
    setSelectedComponent(<Quiz />);
  };

  const handleMetrics = () => {
    setMetricsClicked(true);
    setQuizClicked(false);
    setSignupClicked(false);
    setLoginClicked(false);
    setInfoClicked(false);
    setSupportClicked(false);
    setSelectedComponent(<SleepMetrics />);
  };

  const handleSupport = () => {
    setSupportClicked(true);
    setMetricsClicked(false);
    setQuizClicked(false);
    setSignupClicked(false);
    setLoginClicked(false);
    setInfoClicked(false);
    setSelectedComponent(<Support />);
  };

  const handleInfo = () => {
    setInfoClicked(true);
    setSupportClicked(false);
    setMetricsClicked(false);
    setQuizClicked(false);
    setSignupClicked(false);
    setLoginClicked(false);
    setSelectedComponent(<SleepInfo />);
  };

  const [loginClicked, setLoginClicked] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const [quizClicked, setQuizClicked] = useState(false);
  const [metricsClicked, setMetricsClicked] = useState(false);
  const [infoClicked, setInfoClicked] = useState(false);
  const [supportClicked, setSupportClicked] = useState(false);

  return (
    <div>
      <header>
        <nav>
          <h1 onClick={() => { 
                setSelectedComponent(
                <>
                  <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
                  {!token && 
                    <>
                      <button onClick={() => handleLogin(true)}> Login </button> 
                      <button onClick={() => handleSignup(true)}> Signup </button>
                    </>
                  }
                  {token && 
                    <button onClick={() => handleLogout()}> Logout </button>
                  }
                </>)
            } }>
            Triple Z is Cooking!
          </h1>
          <ul>
            {token && 
              <li onClick={() => setSelectedComponent(<Profile />) }>Profile</li>
            }
            <li onClick={() => setSelectedComponent(<Diet />)}>Diet</li>
            <li onClick={() => setSelectedComponent(<Dream />)}>Dream</li>
            <li onClick={() => setSelectedComponent(<Sleep handleQuiz={handleQuiz} handleMetrics={handleMetrics}
              handleSupport={handleSupport} handleInfo={handleInfo} />)}>Sleep</li>
            <li onClick={() => setSelectedComponent(<Mental />)}>Mentality</li>
          </ul>
        </nav>
      </header>
      <section>{selectedComponent}</section>
    </div>
  );
}

export default Navigation;
