import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './SleepMetrics.css';

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
  const [refetch, setRefetch] = useState(true);

  const dayMiliseconds = 24 * 60 * 60 * 1000

  async function fetchSleepLogs() {
    const today = Date.now()
    const lastWeekDate = new Date(today - 7 * dayMiliseconds)
    const sevenDaysAgo = new Date(`${lastWeekDate.getMonth() + 1}-${lastWeekDate.getDate()}-${lastWeekDate.getFullYear()}`).getTime()

    const url = `/api/v1/sleeplogs/${email}?start=${sevenDaysAgo}&end=${today}`;
    try {
      const response = await fetch(url);
      const res = await response.json();
      const entries = fillEmptyDates(sevenDaysAgo, today, res.sleepLogs)
      setSleepLogs(entries);
      setRefetch(false);
    } catch (e) {
      console.log(e);
    }
  }

  function fillEmptyDates(start, end, entries) {
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
  }, [refetch]);


  const addSleepData = async () => {
    if (enteredDate && enteredHours && sinceEpoch) {
      console.log("tesyt")
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
  
        setRefetch(true)
  
        setDate('');
        setHours(0);
        setNote('');
        setsinceEpoch(0);
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
    marker: { color: 'rgba(75, 192, 192, 0.6)' },
  };

  const data = [userSleepData, idealSleepData];

  const layout = {
    title: 'Sleep Metrics Chart',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Hours Slept' },
    plot_bgcolor:"#C0C0C0",
    paper_bgcolor:"#C0C0C0" 
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
                  <input type="date" value={enteredDate} onChange={(e) => { setDate(e.target.value); setsinceEpoch(formatSinceEPOCH(e.target.value)) }}/>
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
              <ul>
                {
                sleepLogs.map((entry, index) => {
                  const date = new Date(entry.date.string)
                  return <li key={index}>{`${date.toDateString()}:`}<br/>{`${entry.notes? entry.notes: "None"}`}</li>
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
