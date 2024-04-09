import React, { useState, useEffect } from 'react';
// need to edit this according to the paper as the logic is there,
//should be done in 1-2 day
function Profile() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [selectedFile, setSelectedFile] = useState('');

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
      if (res.profile.picture === "" || res.profile.picture === undefined) {
        setPicture("media/dog.jpg");
      } else {
        setPicture(res.profile.picture);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const uploadFile = (e) => 
  {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('email', email)
      updateImage(formData);
  }


  function updateImage(formData) {     
    return fetch('/api/v1/profile/picture', {
        method : 'POST',
        headers : {
        },
        body: formData
    }).then(data => data.json())
  }


  useEffect(() => {
    fetchProfile();
  }, []);

    return (
    <>
      <img src={picture} width="100px"/>
      <h5> Email: <p> {email} </p> </h5>
      <h5> First Name: <p> {first} </p> </h5>
      <h5> Last Name: <p> {last} </p> </h5>
      <h5> Default user profile image goes here</h5>
      <p>Change image: </p>

      <form onSubmit={uploadFile}>
      <label>
        Upload new profile picture
        <input type="file" name="file" onChange={(e) => {fileChangeHandler(e)}} />
      </label>
      <button type="submit" >Upload!</button> 
      </form>

    </>
  );
}

export default Profile;