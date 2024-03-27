import React , { useState, useEffect } from 'react';

import './Spd.css';

function Spd() {

  const [spdEntries, setSpdEntries] = useState([]);
  const [spdEntry, setSpdEntry] = useState('');
  const [name, setName] = useState('');
  const [description, setDiscription] = useState('');
  const [location, setsinceEpoch] = useState(0);
  const [refetch, setRefetch] = useState(true);
  
  return(
  <>
      <p>SPD</p>
  </>
  );
}

export default Spd;