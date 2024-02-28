import { React, useState} from 'react';

function HomePage({ handleSignup, handleLogin, token }) {
  return (
    <>
      <section>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
        <h3> Sleepy people image </h3>
      </section>
      {!token &&
        <>
          <button onClick={() => handleLogin(true)}> Login </button> 
          <button onClick={() => handleSignup(true)}> Signup </button>
        </>
      }
    </>
  );
}

export default HomePage;
