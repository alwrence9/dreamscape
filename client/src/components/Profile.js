import React, { useState, useEffect } from 'react';
// need to edit this according to the paper as the logic is there,
//should be done in 1-2 day
function Profile() {

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  async function fetchProfile() {
    //Email should be changed to the actual email of the loged in user
    var email = JSON.parse(localStorage.getItem("token")).email;
    const url = `/api/v1/profile/${email}`;
    try {
      const response = await fetch(url);
      const res = await response.json();
      setFirst(res.profile.firstName);
      setLast(res.profile.lastName);
      setEmail(res.profile.email);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

    return (
    <>
      <h5> Email: <p> {email} </p> </h5>
      <h5> First Name: <p> {first} </p> </h5>
      <h5> Last Name: <p> {last} </p> </h5>
      <h5> Default user profile image goes here</h5>
      <img src="dog.jpg" width="500" height="600"></img>
      
    </>
  );
}

export default Profile;