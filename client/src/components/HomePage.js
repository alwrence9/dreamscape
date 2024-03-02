import React from 'react';

// eslint-disable-next-line react/prop-types
function HomePage({ handleSignup, handleLogin }) {
  return (
    <>
      <section>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
        <div className="homeItems">
          <li onClick={() => handleLogin(true)}> Login </li>
          <li onClick={() => handleSignup(true)}> Signup </li>
        </div>
      </section>
    </>
  );
}

export default HomePage;
