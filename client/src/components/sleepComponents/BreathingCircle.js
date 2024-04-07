import React, { useState, useEffect } from 'react';

const BreathingCircle = () => {
  const [circleSize, changeCircleSize] = useState(100);
  const [isInhaling, updateInhalingState] = useState(true);
  const [totalBreaths, updateTotalBreaths] = useState(0);
  const [breathingStarted, updateBreathingStarted] = useState(false);
  const [breathCount, updateBreathCount] = useState(0);
  const [circleOpacity, changeCircleOpacity] = useState(1);

  useEffect(() => {
    let breathingInterval;
    if (breathingStarted && breathCount < totalBreaths) {
      breathingInterval = setInterval(() => {
        if (isInhaling) {
          changeCircleSize(previousSize => previousSize + 1);
          changeCircleOpacity(previousOpacity => previousOpacity - 0.01);
          if (circleSize >= 200) {
            updateInhalingState(false);
          }
        } else {
          changeCircleSize(previousSize => previousSize - 1);
          changeCircleOpacity(previousOpacity => previousOpacity + 0.01);
          if (circleSize <= 100) {
            updateInhalingState(true);
            updateBreathCount(previousCount => previousCount + 1);
          }
        }
      }, 20); 
    } else if (breathCount === totalBreaths) {
      updateBreathingStarted(false);
      updateBreathCount(0);
    }

    return () => clearInterval(breathingInterval);
  }, [isInhaling, circleSize, breathingStarted, breathCount, totalBreaths]);

  return (
    <div>
      <div style={{
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          borderRadius: '50%',
          backgroundColor: 'blue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px',
          opacity: `${circleOpacity}`
        }}>
          {isInhaling ? 'Inhale' : 'Exhale'}
        </div>
      </div>
    </div>
  );
};

export default BreathingCircle;