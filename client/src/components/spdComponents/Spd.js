import React , { useState, useEffect } from 'react';

import './Spd.css';

function Spd() {

  const [spdEntries, setSpdEntries] = useState([]);
  const [spdEntry, setSpdEntry] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState('');
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
    <h1>Add your SPD Experience</h1>
    <div>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName()}/>
    </div>
    <div>
      <label>Danger Level</label>
        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
      </div>
      <div>
        <label>Descrption:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button onClick={addSpdEntry}>Add SPD Experience</button>
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