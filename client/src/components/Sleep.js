/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Sleep.css';

function Sleep({handleQuiz, handleMetrics, handleSupport, handleInfo}) {

    return (
    <>
      <div className="sleep-container">
        <table className="sleep-table">
          <tbody>
          <tr>
            <td onClick={() => handleQuiz(true)}>My Chronotypes</td>
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

export default Sleep;