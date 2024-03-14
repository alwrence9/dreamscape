import React from 'react';
import './Sleep.css';

function Sleep({handleQuiz, handleMetrics, handleSupport, handleInfo}) {

    return (
    <>
      <div className="sleep-container">
        <table className="sleep-table">
          <tbody>
          <tr>
            <td onClick={() => handleQuiz(true)}>My Chronotype</td>
            <td onClick={() => handleInfo(true)}>Chronotypes Information</td>
          </tr>
          <tr>
            <td onClick={() => handleMetrics(true)}>Sleep Metrics</td>
            <td onClick={() => handleSupport(true)}>Excersises & Support</td>
          </tr>
          </tbody>
        </table> 
      </div>
    </>
  );
}


function ChronotypesFooter() {
  return (
    <div id="footer-content">
      <h3>420-620-DW Web Development Project</h3>
      <p>By: Hooman Afshari, Sila Ben Khelifa, Ashley Vu and Farhan Khandaker</p>
      <div id="sources">
        <h3>Sources & Attributions:</h3>
        <div id="source-columns">
          <div id="source-col-1">
            <ul>
              <li>Sleep Foundation: <a target="_blank" rel="noreferrer" href="https://www.sleepfoundation.org/how-sleep-works/chronotypes">Click</a></li>
            </ul>
          </div>
          <div id="source-col-2">
            <ul>
              <li>National Library of Medicine: <a target="_blank" rel="noreferrer" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9399511/">Click</a></li>
            </ul>
          </div>
          <div id="source-col-3">
            <ul>
              <li>Sleep Doctor: <a target="_blank" rel="noreferrer" href="https://sleepdoctor.com/how-sleep-works/chronotypes/">Click</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export {Sleep, ChronotypesFooter};