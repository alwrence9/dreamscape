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
  //Contains country name, lat, and lon
  const [countryData, setcountryData] = useState([]);
  //Selected coordinates
  const [coordinates, setCoordinates] = useState([0,0]);

  //Description of the clicked marker
  const[clickedInfo, setClickedInfo] = useState('');
  const [infoLevel, setInfoLevel] = useState(0);
  
  const [retrievedSpds, setRetrievedSpds] = useState([]);

  const [countriesFetched, setCountryFetch] = useState(false);
  const [refetch, setRefetch] = useState(true);

  //Demon Icon
  const customIcon = new L.Icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Devil_Skull_Icon.svg/1200px-Devil_Skull_Icon.svg.png',
    iconSize: [41, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
  });

  let infoColorClass;
  if (infoLevel >= 0 && infoLevel <= 1) {
    infoColorClass = 'green';
  } else if (infoLevel >= 2 && infoLevel <= 3) {
    infoColorClass = 'orange';
  } else if (infoLevel >= 4 && infoLevel <= 5) {
    infoColorClass = 'red';
  } else {
    // Default color class or handle other cases
    infoColorClass = '';
  }

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
        const coords = entry.coordinates.split(',')
        const loc = findCountry(coords[0],coords[1]);
        retrievedSpds.push({country: loc, lat: coords[0], lon: coords[1], 
                            name: entry.name, dangerLVL: entry.dangerLVL, description: entry.description});
      }
      setRetrievedSpds(retrievedSpds);
      setRefetch(false);
    } catch (e) {
      console.error(e);
    }
  }

  function findCountry(lat,lon) {
    for(var data of countryData ) {
      if (data.lat===parseFloat(lat) && data.lon===parseFloat(lon)) {
        return data.country;
      }
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
    <h3>Sleep Paralysis Demon</h3>
    <details>
          <summary>Enter a new SPD!</summary>
          <div id="spd-form-container">
          <fieldset>
            <legend><h2>New SPD</h2></legend>
            <form>
              <div id="spd-form">

                <div id ="label-column">
                  <label>Name:</label>
                  <label>Country:</label>
                  <label>DangerLVL:</label>
                  <label>Descrption:</label>
                </div>

                <div id ="input-column">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                  <select value={location} onChange={(e) => handleLocationChange(e)}>
                    {countryData.map((country, index) => (
                    <option key={index} value={country.country}>{country.country}</option>
                    ))}
                  </select>
                  <input type="number" value={level} min="0" max="5" onChange={(e) => setLevel(e.target.value)} />
                  <textarea placeholder="Notes" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>

            </form>

            <div id="spd-form-buttons">
            <button onClick={addSpdEntry}>Add SPD Experience</button>
            </div>

          </fieldset>
        </div>
      </details>

      <details>
      <summary>Entered SPDs</summary>
      <ul id="entered-spd" className={infoColorClass}>
        {clickedInfo}
      </ul>
    </details>

      <div id="map">
        <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
          <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> | Tiles © <a href="https://leafletjs.com/">Leaflet</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
          { coordinates[0]!==0 && coordinates[1]!==0 &&
          <Marker position={coordinates} icon={customIcon}>
            <Popup>Selected Country: <br/> {location}</Popup>
          </Marker>
          }
           {retrievedSpds.map((spd, index) => (
          <Marker 
            key={index} 
            position={[spd.lat, spd.lon]} 
            eventHandlers={{
              click: () => {
                setClickedInfo(spd.description);
                setInfoLevel(spd.dangerLVL);
              },
            }}
          >
            <Popup>
              <h4>Name: </h4>{spd.name}<br />
              <h4>Country: </h4>{spd.country}<br />
              <h4>DangerLVL: </h4>{spd.dangerLVL}
            </Popup>
          </Marker>
        ))}
        </MapContainer>
      </div>
  </>
  );
}

export default Spd;