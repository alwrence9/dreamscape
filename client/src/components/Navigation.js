import React, { useState } from 'react';
import Sleep from './Sleep.js';
import Dream from './Dream.js';
import Diet from './Diet.js';
import Profile from './Profile.js';
import Mental from './Mental.js';



function Navigation() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleItemClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <header>
        <nav>
          <h1>Triple Z is Cooking!</h1>
          <ul>
            <li onClick={() => handleItemClick(Profile)}>Profile</li>
            <li onClick={() => handleItemClick(Diet)}>Diet</li>
            <li onClick={() => handleItemClick(Dream)}>Dream</li>
            <li onClick={() => handleItemClick(Sleep)}>Sleep</li>
            <li onClick={() => handleItemClick(Mental)}>Mentality</li>
          </ul>
        </nav>
      </header>

      <section>
        {selectedComponent}
      </section>
    </div>
  );
}

export default Navigation;
