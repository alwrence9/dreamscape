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
      </section>
      <button onClick={() => handleLogin(true)}> Login </button>
      <button onClick={() => handleSignup(true)}> Signup </button>
    </>
  );
}

export default HomePage;
