import React , { useState, useEffect } from 'react';

import './Spd.css';

function Spd() {

  const [spdEntries, setSpdEntries] = useState([]);
  const [spdEntry, setSpdEntry] = useState('');
  const [name, setName] = useState('');
  const [description, setDiscription] = useState('');
  const [location, setsinceEpoch] = useState(0);
  const [refetch, setRefetch] = useState(true);

  async function fetchSpdEntries() {
    const url = '/api/v1/spd';
    try {
      const response = await fetch(url);
      const res = await response.json();
      setSpdEntries(res.SPDentries);
      setRefetch(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchSpdEntries();
  }, [refetch]);
  
  return(
  <>
    <details>
      <summary>Entered SPDs</summary>
      <ul>
            {spdEntries?.map((entry, index) => (
              <li key={index}>{`Name: ${entry.name}, Danger Level: ${entry.dangerLVL}, Description: ${entry.description}`}</li>
            ))}
      </ul>
    </details>
  </>
  );
}

export default Spd;