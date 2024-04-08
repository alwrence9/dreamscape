import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './SleepMetrics.css';

const dayMiliseconds = 24 * 60 * 60 * 1000;

function SleepMetrics() {
  const storedToken = localStorage.getItem("token");
  const email = storedToken ? JSON.parse(storedToken).email : null
  if (email===null) {
    return(
      <h4>You have to login first in order to use this service</h4>
    );
  }

  const [sleepLogs, setSleepLogs] = useState([]);
  const [enteredDate, setDate] = useState('');
  const [enteredHours, setHours] = useState(0);
  const [enteredNote, setNote] = useState('');
  const [sinceEpoch, setsinceEpoch] = useState(0);
  const [viewedWeek, setViewedWeek] = useState(getStartOfNextWeek(new Date(new Date(Date.now()).toLocaleDateString())));
  const [refetch, setRefetch] = useState(false);

  async function fetchSleepLogs() {
    const sevenDaysAgo = viewedWeek - (7 * dayMiliseconds);

    const url = `/api/v1/sleeplogs/${email}?start=${sevenDaysAgo}&end=${viewedWeek}`;

    const response = await fetch(url);
    const res = await response.json();
    const entries = fillEmptyDates(sevenDaysAgo, viewedWeek, res.sleepLogs)
    setSleepLogs(entries);
    setRefetch(false)
  }

  function fillEmptyDates(start, end, entries) {
    if(!entries){
      entries = []
    }
    const sleepLogs = []

    for (let ms = start; ms <= end; ms = ms + dayMiliseconds){
      const date = new Date(ms)
      const search = entries.find( (entry) => entry.date.sinceEpoch === ms );
      if(search){
        sleepLogs.push(search);
      }
      else{
        const newEntry = {
          "email" : email,
          "date" : {
            "string": `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
            "sinceEpoch": ms
          },
          "hoursSlept": 0,
          "notes": ""
        };
        sleepLogs.push(newEntry);
      }
    }

    return sleepLogs;
  }

  useEffect(() => {
    fetchSleepLogs();
  }, [viewedWeek, refetch]);


  const addSleepData = async () => {
    if (enteredDate && enteredHours && sinceEpoch) {
      const url = '/api/v1/sleeplogs/new';
  
      const data = {
        email: email,
        date: { string: formatDate(enteredDate), sinceEpoch: sinceEpoch },
        hoursSlept: parseFloat(enteredHours),
        optionalComment: enteredNote,
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
  
        setDate('');
        setHours(0);
        setNote('');
        setsinceEpoch(0);
        setViewedWeek(getStartOfNextWeek(new Date(new Date(enteredDate).toLocaleDateString())));
        setRefetch(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const idealSleepData = {
    x: sleepLogs.map((entry) => entry.date.string),
    y: Array(sleepLogs.length).fill(8),
    type: 'scatter',
    mode: 'lines',
    name: 'Ideal Sleep Hours',
    line: { color: 'red', dash: 'dash' }, 
  };

  const userSleepData = {
    x: sleepLogs.map((entry) => entry.date.string),
    y: sleepLogs.map((entry) => entry.hoursSlept),
    type: 'bar',
    name: 'Hours Slept',
    marker: { color: 'rgb(222 59 255)' },
  };

  const data = [userSleepData, idealSleepData];

  const layout = {
    title: 'Sleep Metrics Chart',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Hours Slept' },
    plot_bgcolor:"#B4D2DC",
    paper_bgcolor:"#B4D2DC" 
  };

  function formatDate(str) {
    const prevD = new Date(str);
    //Add one extra day
    const d = new Date(prevD.getTime() + (24 * 60 * 60 * 1000));
    d.setHours(0);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  } 

  function formatSinceEPOCH(str) {
    const prevD = new Date(str);
    //Add one extra day
    const d = new Date(prevD.getTime() + (24 * 60 * 60 * 1000));
    d.setHours(0);
    return d.getTime();
  } 

  function getStartOfNextWeek(dateInMiliseconds){
    const formattedDate = new Date(dateInMiliseconds);
    const daysFromMonday = formattedDate.getDay() >= 2 ? 8 - formattedDate.getDay() : 1 - formattedDate.getDay();
    const monday = new Date(formattedDate.getTime() + (daysFromMonday * dayMiliseconds) );
    return monday.getTime();
  }

  return (
    <section id="sleep-metrics">
      <h1>Sleep Metrics</h1>
      <details>
          <summary>Enter a new sleep log!</summary>
          <div id="sleep-form-container">
          <fieldset>
            <legend><h1>New Sleep Log Entry</h1></legend>
            <form>
              <div id="sleep-form">

                <div id ="label-column">
                  <label>Date:</label>
                  <label>Sleep Hours:</label>
                  <label>Descrption:</label>
                </div>

                <div id ="input-column">
                  <input type="date" onChange={(e) => { setDate(e.target.value); setsinceEpoch(formatSinceEPOCH(e.target.value)) }}/>
                  <input type="number" min="0" max="24" value={enteredHours} onChange={(e) => setHours(e.target.value)} />
                  <textarea placeholder="Notes" value={enteredNote} onChange={(e) => setNote(e.target.value)} />
                </div>
              </div>

            </form>

            <div id="sleep-form-buttons">
              <button onClick={addSleepData}>Add Sleep hours</button>
            </div>

          </fieldset>
        </div>
      </details>
      {sleepLogs.length > 0 && (
        <div>
          <div id="sleep-metrics-container">
            <div id="sleep-notes">
              <h2>Previous Sleep Logs:</h2>
              <input id="week-picker" type="date" onChange={(e) => { setViewedWeek(getStartOfNextWeek(formatDate(e.target.value))) } }/>
              <ul>
                {
                sleepLogs.map((entry, index) => {
                  const date = new Date(entry.date.string)
                  return <li key={index}>{`${date.toDateString()}:`}<br/>{`${entry.notes? entry.notes: "Empty"}`}</li>
                })
                }
              </ul>
            </div>

            <div id="chart-container">
            {
            sleepLogs.length > 0 && (
              <Plot data={data} layout={layout} />
            )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

export default SleepMetrics;
