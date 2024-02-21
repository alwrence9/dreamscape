import React, { useState } from 'react';
import Sleep from './Sleep.js';
import Dream from './Dream.js';
import Diet from './Diet.js';
import Profile from './Profile.js';
import Mental from './Mental.js';



function Navigation() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  return (
    <div>
      <header>
        <nav>
          <h1 onClick={() => setSelectedComponent(homePage) }>Triple Z is Cooking!</h1>
          <ul>
            <li onClick={() => setSelectedComponent(Profile)}>Profile</li>
            <li onClick={() => setSelectedComponent(Diet)}>Diet</li>
            <li onClick={() => setSelectedComponent(Dream)}>Dream</li>
            <li onClick={() => setSelectedComponent(Sleep)}>Sleep</li>
            <li onClick={() => setSelectedComponent(Mental)}>Mentality</li>
          </ul>
        </nav>
      </header>

      <section>
        {selectedComponent}
      </section>
    </div>
  );
}

function homePage() {
  return <section>
          <h3> Sleepy people image </h3>
          <h3> Sleepy people image </h3>
          <h3> Sleepy people image </h3>
          <h3> Sleepy people image </h3>
        </section>;
}

export default Navigation;
