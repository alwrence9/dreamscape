import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable'
import './Dream.css';

function Dream() {
  const [resultText, setMessage] = useState('');

  const [entries, setEntries] = useState([]);

  const [currentCard, setCurrentCard] = useState([]);

  const [title, setTitle] = useState('Title');
  const [optionalDescription, setDescription] = useState('Write all about your dreams here!');
  const [dateValue, setDate] = useState('');
  //Getting email from local storage
  var email = JSON.parse(localStorage.getItem("token")).email;

  //For logging in regularly
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Check if both title and description are not empty
    if (title.trim() !== '' && optionalDescription.trim() !== '') {

      //Structuring date like this so it is easier to sort entries by order in the future
      const date = { "string": dateValue, "sinceEpoch": new Date(dateValue).getTime() }

      //Adding new dream entry to api
      try {
        const response = await fetch('/api/v1/dreams/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, date, title, optionalDescription }),
        });
  
        if (response.ok) {
          fetchEntries();
          setTitle('Title');
          setDescription('Write all about your dreams here!')
          setMessage('Added new dream entry!');
        } 
        else {
          setMessage('Error response from server')
        }
      } catch (error) {
        setMessage('Error:', error);
      }
    }
    else {
      setMessage('Enter both username and password');
    }
  
  };

  async function fetchEntries() {
    var email = JSON.parse(localStorage.getItem("token")).email;
    const url = `/api/v1/dreams/${email}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const res = await response.json();
        setEntries(res.dreams.sort((a, b) => parseFloat(a.date.sinceEpoch) - parseFloat(b.date.sinceEpoch)));
      }
    } catch (e) {
      setMessage(e);
    }
  }

  async function fetchCard() {
    const url = `/api/v1/tarot/randomCard`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const res = await response.json();
        setCurrentCard(res.tarotCard[0]);
      }
    } catch (e) {
      setMessage(e);
    }
  }

  function styling(style) {
    let newString = '';
    const dreamDesc = document.getElementById('dream-desc');
    const index = dreamDesc.innerHTML.indexOf(window.getSelection().toString());
    let substring = dreamDesc.innerHTML.substring(index, index + window.getSelection().toString().length).trim(' ');
    const substringIfStyled = dreamDesc.innerHTML.substring(index-3, index + window.getSelection().toString().length+4).trim(' ');
    //TO DO: find the substring in the actual innerhtml 
    // check the indeces after and right before the substring to check if there is a text styling tag there
    // if found, then do the replacing thing
    if (!substring) {
      return '';
    }
    else if (substringIfStyled.includes('<b>')) {
      substring = substringIfStyled;
      newString = substringIfStyled.replace('<b>', '');
      newString = newString.replace('</b>', '');
    }
    else if (substringIfStyled.includes('<i>')) {
      substring = substringIfStyled;
      newString = substringIfStyled.replace('<i>', '');
      newString = newString.replace('</i>', '');
    }
    else if (dreamDesc.innerHTML.substring(index-6, index + window.getSelection().toString().length+7).trim(' ').includes('<mark>')) {
      substring = dreamDesc.innerHTML.substring(index-6, index + window.getSelection().toString().length+7).trim(' ');
      newString = substring.replace('<mark>', '');
      newString = newString.replace('</mark>', '');
    }
    else {
      switch(style) {
        case 'bold':
          newString = '  <b>' + substring + '</b>  '
          break;
        case 'italics':
          newString = '  <i>' + substring + '</i>  '
          break;
        case 'highlight':
          newString = '<mark>' + substring + '</mark>'
          break;
        default:
          newString = substring
          break;
      }
    }
    const replacement = dreamDesc.innerHTML.replace(substring, newString);
    dreamDesc.innerHTML = replacement;
  }

  useEffect(() => {
    fetchEntries();
  }, []);
  
    return (
    <section id="dreams">
      <h1> Dream </h1>
      <form onSubmit={handleSubmit} className="journal-entry">
        <input type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required/>

        <input type="date"
          onChange={(e) => setDate(e.target.value)}
          required/>

        <div className="styling-names">
          <button type="button" onClick={()=>{styling('bold');}}>Bold</button>
          <button type="button" onClick={()=>{styling('italics');}}>Italics</button>
          <button type="button" onClick={()=>{styling('highlight');}}>Highlight</button>
        </div>
  
        <ContentEditable id="dream-desc" html={optionalDescription} onChange={(e) => setDescription(e.target.value)}/>

        <button id="dream-submit" type="submit">Save</button>
      </form>

      { optionalDescription !== 'Write all about your dreams here!' &&
      <section id="fortune-telling"> 
        { currentCard.image &&
        <>
          <h4> You got the {currentCard.name} </h4>
          <div className="img-desc-container">
            <img src={currentCard.image} alt={currentCard.alt} className="tarot"/>
            {<script> console.log(currentCard.description) </script>}
            <p className="tarot-desc"> {currentCard.description} </p>
          </div>
        </>
        }
        <button onClick={fetchCard} className="tarot-button"> Do you wonder what the meaning of your dream is? </button>
        
      </section>
      }

      <p>{resultText}</p>

      <details>
        <summary>View past dream entries</summary>
        <section>{entries.map((entry)=> {return <section className="past-dreams" key={entry.title}>
            <p>{entry.title}</p>
            <p>{entry.date.string}</p>
            <p dangerouslySetInnerHTML={{ __html: entry.description }}></p>
          </section>
       })}</section>
      </details>
    </section>
  );
}

export default Dream;