import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function SleepMetrics() {
  const storedToken = localStorage.getItem("token");
  const email = storedToken ? JSON.parse(storedToken).email : null
  if (email==null) {
    return(
      <h4>You have to login first in order to use this service</h4>
    );
  }
  const [sleepResult, setSleepResult] = useState([]);
  const [entereddDate, setDate] = useState('');
  const [enteredHours, setHours] = useState('');

  const addSleepData = () => {
    if (entereddDate && enteredHours) {
      const newSleepData = [...sleepResult, { date: entereddDate, hours: parseFloat(enteredHours) }];
      setSleepResult(newSleepData);
      setDate('');
      setHours('');
    }
  };

  console.log(email);
  const idealSleepData = {
    x: sleepResult.map((entry) => entry.date),
    y: Array(sleepResult.length).fill(8),
    type: 'scatter',
    mode: 'lines',
    name: 'Ideal Number of Sleep Hours',
    line: { color: 'red', dash: 'dash' }, 
  };

  const userSleepData = {
    x: sleepResult.map((entry) => entry.date),
    y: sleepResult.map((entry) => entry.hours),
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

  return (
    <div>
      <h1>Sleep Metrics</h1>
      <div>
        <label>Date:</label>
        <input type="date" value={entereddDate} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Sleep Hours:</label>
        <input type="number" value={enteredHours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <button onClick={addSleepData}>Add Sleep hours</button>

      {sleepResult.length > 0 && (
        <div>
          <h2>Entered Data:</h2>
          <ul>
            {sleepResult.map((entry, index) => (
              <li key={index}>{`${entry.date}: ${entry.hours} hours`}</li>
            ))}
          </ul>
        </div>
      )}

      {sleepResult.length > 0 && (
        <div>
          <h2>Result:</h2>
          <Plot data={data} layout={layout} />
        </div>
      )}
    </div>
  );
}

export default SleepMetrics;
