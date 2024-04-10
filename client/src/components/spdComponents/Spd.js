import React , { useState, useEffect } from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet';


import './Spd.css';

function Spd() {

  const [spdEntries, setSpdEntries] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('- Select a country -');
  const [countryData, setcountryData] = useState([]);
  const [coordinates, setCoordinates] = useState([0,0]);
  
  const [allCoordinates, setAllCoordinates] = useState([]);

  const [countriesFetched, setCountryFetch] = useState(false);
  const [refetch, setRefetch] = useState(true);

  const customIcon = new L.Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
  });

  function handleLocationChange(e) {
    for(var data of countryData ) {
      if (data.country===e.target.value) {
        setCoordinates([data.lat, data.lon]);
      }
    }
    setLocation(e.target.value);
  }
  
  async function fetchAllCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,latlng');
      const data = await response.json();
      console.log(data);
      const formattedData = data.map(item => ({
          country: item.name.common,
          lat: item.latlng[0],
          lon: item.latlng[1]
      }));
      const sortedData = formattedData.sort((a, b) => {
        return a.country.localeCompare(b.country);
      });
      sortedData.unshift({
        country: '- Select a country -',
        lat: 0,
        lon: 0
    });
      setcountryData(sortedData);
      setCountryFetch(true);
    } catch (error) {
      console.error('Error fetching country names:', error);
    }
  }

  async function fetchSpdEntries() {
    const url = '/api/v1/spd';
    try {
      const response = await fetch(url);
      const res = await response.json();
      setSpdEntries(res.SPDentries);
      for (var entry of spdEntries) {
        allCoordinates.push(entry.coordinates.split(','))
      }
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
    const coordinatesString = coordinates.toString(); 
    if (name !=='' && level!=='') {
      const data = {
        name: name,
        level: level,
        optionalDescription: description,
        coordinates: coordinatesString,
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
        setCoordinates([0,0])
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
      <label>Select Country</label>
      <select value={location} onChange={(e) => handleLocationChange(e)}>
        {countryData.map((country, index) => (
          <option key={index} value={country.country}>{country.country}</option>
        ))}
      </select>
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
      { coordinates[0]!==0 && coordinates[1]!==0 &&
      <Marker position={coordinates} icon={customIcon}>
        <Popup>{location}</Popup>
      </Marker>
      }
      {allCoordinates.map((coordinates, index) => (
      <Marker key={index} position={coordinates}>
        <Popup>{location}</Popup>
      </Marker>
    ))}
    </MapContainer>
    </div>
  </>
  );
}

export default Spd;