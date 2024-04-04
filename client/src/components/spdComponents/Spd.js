import React , { useState, useEffect } from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'

import './Spd.css';

function Spd() {

  const [spdEntries, setSpdEntries] = useState([]);
  const [spdEntry, setSpdEntry] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState('');
  const [location, setsinceEpoch] = useState(0);
  const [countryNames, setCountryNames] = useState([]);
  const [countriesFetched, setCountryFetch] = useState(false);
  const [refetch, setRefetch] = useState(true);

  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const countries = data.map(country => country.name.common);
      setCountryNames(countries);
      setCountryFetch(true);
    } catch (error) {
      console.error('Error fetching country names:', error);
    }
  };

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
    if(countriesFetched===false) {
      fetchAllCountries();
    }
  }, [refetch]);

  const addSpdEntry = async () => {
    const url = '/api/v1/spd/new';
    if (name !=='' && level!=='') {
      const data = {
        name: name,
        level: level,
        optionalDescription: description,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        setRefetch(true)
  
        setName('');
        setLevel(0);
        setDescription('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return(
  <>
    <h3>Add your SPD Experience</h3>
    <div>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
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
    <div id="map">
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  </>
  );
}

export default Spd;