import React, { useState, useEffect } from 'react';
import {Sleep, ChronotypesFooter} from './Sleep.js';
import Dream from './dreamComponents/Dream.js';
import {Diet, DietPageFooter} from './dietComponents/Diet.js';
import Profile from './Profile.js';
import {Mental, MentalityPageFooter} from './mentalityComponents/Mental.js';
import {HomePage, HomePageFooter} from './HomePage.js';
import LoginForm from './loginComponents/Login.js';
import SignupForm from './signupComponents/Signup.js';
import Quiz from './sleepComponents/Quiz.js';
import SleepInfo from './sleepComponents/SleepInfo.js';
import SleepMetrics from './sleepComponents/SleepMetrics.js';
import Support from './sleepComponents/Support.js';
import Spd from './spdComponents/Spd.js';


const defaultFooter = 
  <div id="footer-content">
    <h3>420-620-DW Web Development Project</h3>
    <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
    <div id="sources">
      <h3>Sources & Attributions:</h3>
      <div id="source-columns">
        <div id="source-col-1">
          <ul>
          </ul>
        </div>
        <div id="source-col-2">
          <ul>
          </ul>
        </div>
        <div id="source-col-3">
          <ul>
          </ul>
        </div>
      </div>
    </div>
  </div>

function Navigation() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setLoginClicked(true);
    setSignupClicked(false);
    setSelectedComponent(
      <LoginForm 
        setToken={setToken}
        handleLogin={handleGoogleLogin}
        handleError={handleError}
        setDefaultComponent={setDefaultComponent}
      />
    );
    setSelectedFooter(defaultFooter);
  };

  const handleSignup = () => {
    setSignupClicked(true);
    setLoginClicked(false);
    setSelectedComponent(
      <SignupForm 
        setToken={setToken} 
        handleLogin={handleGoogleLogin} 
        handleError={handleError}
        setDefaultComponent={setDefaultComponent}
        />
    );
    setSelectedFooter(defaultFooter);
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
      localStorage.clear();
      setSelectedComponent(
        <>
          <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
          <section className="home-items">
            <li onClick={() => handleLogin(true)}> Login </li> 
            <li onClick={() => handleSignup(true)}> Signup </li>
          </section>
        </>
      );
      setSelectedFooter(<HomePageFooter/>);
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
      setToken(token);
      localStorage.setItem("token", token);
      //Redirect to home page once logged in
      setSelectedComponent(
        <>
          <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
          <section className="home-items">
            <li onClick={() => handleLogout()}> Logout </li>
          </section>
        </>
      );
      setSelectedFooter(<HomePageFooter/>);
    }
  }

  const handleError = error => {
    alert("Error logging in");
  }

  const defaultComponent = 
  <>
    <HomePage handleSignup={handleSignup} handleLogin={handleLogin} /> 
    <section className="home-items">
    {!token && 
      <>
        <li onClick={() => handleLogin(true)}> Login </li> 
        <li onClick={() => handleSignup(true)}> Signup </li>
      </>
    }
    {token && 
      <li onClick={() => handleLogout()}> Logout </li>
    }
    </section>
  </>

  const setDefaultComponent = () => {
    setSelectedComponent(defaultComponent);
  }

  const [selectedComponent, setSelectedComponent] = useState(defaultComponent);
  const [selectedFooter, setSelectedFooter] = useState(<HomePageFooter/>);

  const handleQuiz = () => {
    setQuizClicked(true);
    setSignupClicked(false);
    setLoginClicked(false);
    setMetricsClicked(false);
    setInfoClicked(false);
    setSupportClicked(false);
    setSelectedComponent(<Quiz />);
    setSelectedFooter(<ChronotypesFooter/>);
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
    setSelectedFooter(<ChronotypesFooter/>);
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
          <h1 onClick={() => { setDefaultComponent(); setSelectedFooter(<HomePageFooter/>); } }>
            <span id="title">Dreamscape</span>
          </h1>
          <ul className="navigation">
            {token && 
              <li onClick={() => setSelectedComponent(<Profile />) }>Profile</li>
            }
            <li onClick={() => { setSelectedComponent(<Diet />); setSelectedFooter(<DietPageFooter/>); } }>Diet</li>
            { token && <li onClick={() => { setSelectedComponent(<Dream />); setSelectedFooter(defaultFooter); } }>Dream</li> }
            <li onClick={() => { 
              setSelectedComponent(<Sleep handleQuiz={handleQuiz} handleMetrics={handleMetrics} handleSupport={handleSupport} handleInfo={handleInfo} />);
              setSelectedFooter(defaultFooter);
              }}
            >Sleep</li>
            <li onClick={() => { setSelectedComponent(<Mental />), setSelectedFooter(<MentalityPageFooter/>); } }>Mentality</li>
            <li onClick={() => { setSelectedComponent(<Spd />);} }>Spd</li>
          </ul>

        </nav>
      </header>
      <main>
        {selectedComponent}
      </main>
      <footer>{selectedFooter}</footer>
    </div>
  );
}

export default Navigation;
