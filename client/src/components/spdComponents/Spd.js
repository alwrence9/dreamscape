import React from 'react';
import './Spd.css';

function Spd() {
  const storedToken = localStorage.getItem("token");
  const email = storedToken ? JSON.parse(storedToken).email : null
  if (email===null) {
    return(
      <h4>You have to login first in order to use this service</h4>
    );
  }
  
  return(
  <>
      <p>SPD</p>
  </>
  );
}

export default Spd;