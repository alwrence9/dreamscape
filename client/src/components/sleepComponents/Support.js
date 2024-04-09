import React, { useState } from 'react';
import BreathingCircle from './BreathingCircle'
import './Support.css'

function Support() {

    return (
    <section id="support">

      <div id="breating-container">
        <h2>Breathing Exercise</h2>
        <BreathingCircle/>
      </div>

      <div id="videos">
        <details>
          <summary>Supporting Videos</summary>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/aSdc1pKnqDY" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/aEqlQvczMJQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/t0kACis_dJE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Us8n8VBQn_c" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/5Ju3XvZ6S1Q" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </details>
      </div>

    </section>
  );
}

export default Support;