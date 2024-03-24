import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function SleepMetrics() {
  const storedToken = localStorage.getItem("token");
  const email = storedToken ? JSON.parse(storedToken).email : null
  if (email===null) {
    return(
      <h4>You have to login first in order to use this service</h4>
    );
  }

  const [sleepLogs, setSleepLogs] = useState([]);
  const [tempLogs, setTempLogs] = useState([]);
  const [enteredDate, setDate] = useState('');
  const [enteredHours, setHours] = useState('');
  const [enteredNote, setNote] = useState('None');
  const [sinceEpoch, setsinceEpoch] = useState(0);
  const [refetch, setRefetch] = useState(true);
  const [firstLog, setFirst] = useState(null);


  async function fetchSleepLogs() {
    const url = `${'/api/v1/sleeplogs/'+email}`;
    try {
      const response = await fetch(url);
      const res = await response.json();
      setTempLogs(res.sleepLogs.sort((a, b) => a.date.sinceEpoch - b.date.sinceEpoch));
      setRefetch(false);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    fetchSleepLogs();
    console.log(tempLogs);
    const copy = [];
    fillEmptyDates(1707868800000, copy);
    console.log(copy);
    setSleepLogs(copy);
  }, [refetch]);


  const addSleepData = async () => {
    if (enteredDate && enteredHours && sinceEpoch) {
      const url = '/api/v1/sleeplogs/new';
  
      const data = {
        email: email,
        date: { string: enteredDate, sinceEpoch: sinceEpoch },
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
        setHours('');
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
    name: 'Ideal Number of Sleep Hours',
    line: { color: 'red', dash: 'dash' }, 
  };

  const userSleepData = {
    x: sleepLogs.map((entry) => entry.date.string),
    y: sleepLogs.map((entry) => entry.hoursSlept),
    type: 'bar',
    name: 'Your Number of Sleep Hours',
    marker: { color: 'rgba(75, 192, 192, 0.6)' },
  };

  const data = [userSleepData, idealSleepData];

  const layout = {
    title: 'Sleep Metrics Bar Chart',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Sleep Hours' },
  };

  function fillEmptyDates(firstSE, copy) {
    console.log(tempLogs);
    const listSE = tempLogs.map((entry) => entry.date.sinceEpoch);
    const firstDate = new Date(firstSE);
    const nextDate = new Date(firstSE + (24 * 60 * 60 * 1000));
    if (!listSE.includes(nextDate.getTime())) {
      const log = { date:{string: `${nextDate.getMonth()+1}-${nextDate.getDate()}-${nextDate.getFullYear()}`, sinceEpoch: nextDate.getTime()}, 
                    email:email ,
                    hoursSlept:0,
                    notes:"",
                  }
      copy.push(log);
    }
    else {
      for (const log of tempLogs) {
        if (log.date.sinceEpoch === nextDate.getTime()) {
          copy.push(log);
          break;
        }
      }
    }
    if (nextDate.getFullYear()===2025) {
      return 0;
    }
    fillEmptyDates(nextDate.getTime(), copy);
  }

  function formatDate(str) {
    const prevD = new Date(str);
    //Add one extra day
    const d = new Date(prevD.getTime() + (24 * 60 * 60 * 1000));
    d.setHours(0);
    setsinceEpoch(d.getTime());
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  } 


  return (
    <div>
      <h1>Sleep Metrics</h1>
      <div>
        <label>Date:</label>
        <input type="date" value={enteredDate} onChange={(e) => setDate(formatDate(e.target.value))}/>
      </div>
      <div>
        <label>Sleep Hours:</label>
        <input type="number" value={enteredHours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <div>
        <label>Descrption:</label>
        <input type="text" value={enteredNote} onChange={(e) => setNote(e.target.value)} />
      </div>
      <button onClick={addSleepData}>Add Sleep hours</button>

      {sleepLogs.length > 0 && (
        <div>
          <h2>Entered Data:</h2>
          <ul>
            {sleepLogs.map((entry, index) => (
              <li key={index}>{`${entry.date.string}: ${entry.hoursSlept} hours, Optional note: ${entry.notes}`}</li>
            ))}
          </ul>
        </div>
      )}

      {sleepLogs.length > 0 && (
        <div>
          <h2>Result:</h2>
          <Plot data={data} layout={layout} />
        </div>
      )}
    </div>
  );
}

export default SleepMetrics;
