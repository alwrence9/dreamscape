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
    const dreamDesc = document.getElementById("dream-desc");
    const index = dreamDesc.innerHTML.indexOf(window.getSelection().toString());
    const substring = dreamDesc.innerHTML.substring(index, index + window.getSelection().toString().length);
    
    let newString = "";
    switch(style) {
      case "bold":
        newString = "  <b>" + substring + "</b>  "
        break;
      case "italics":
        newString = "  <i>" + substring + "</i>  "
        break;
      case "highlight":
        newString = "<mark>" + substring + "</mark>"
        break;
      default:
        newString = substring
        break;
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
      <button onClick={()=>{styling("bold");}}>Bold</button>
      <button onClick={()=>{styling("italics");}}>Italics</button>
      <button onClick={()=>{styling("highlight");}}>Highlight</button>
      <form onSubmit={handleSubmit} className="journal-entry">
        <input type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required/>

        <input type="date"
          onChange={(e) => setDate(e.target.value)}
          required/>

        <ContentEditable id="dream-desc" html={optionalDescription} onChange={(e) => setDescription(e.target.value)}/>

        <button id="dream-submit" type="submit">Save</button>
      </form>

      { optionalDescription !== 'Write all about your dreams here!' &&
      <section id="fortune-telling"> 
        { currentCard.image &&
        <>
          <div className="img-desc-container">
            <img src={currentCard.image} alt={currentCard.alt} className="tarot"/>
            {<script> console.log(currentCard.description) </script>}
            <p className="tarot-desc"> {currentCard.description} </p>
            {/* <ul>
                {currentCard.description.map((desc)=>{return <li key={desc}>{desc}</li>})}
            </ul> */}
          </div>
          <h4> You got the {currentCard.name} </h4>
        </>
        }
        <button onClick={fetchCard}> Do you wonder what the meaning of your dream is? </button>
        
      </section>
      }

      <p>{resultText}</p>

      <details>
        <summary>View past dream entries</summary>
        <section>{entries.map((entry)=> {return <section  key={entry.title}>
            <p>{entry.title}</p>
            <p>{entry.date.string}</p>
            <p>{entry.description}</p>
          </section>
       })}</section>
      </details>
    </section>
  );
}

export default Dream;