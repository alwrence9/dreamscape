import React, { useState } from 'react';
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
          <h1 onClick={() => setSelectedComponent(<HomePage handleSignup={handleSignup} handleLogin={handleLogin} />)}>
            Triple Z is Cooking!
          </h1>
          <ul class="navigation">
            <li onClick={() => setSelectedComponent(<Profile />)}>Profile</li>
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
