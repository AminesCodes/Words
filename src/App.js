import React, { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [display, setDisplay] = useState('');

  const nextWord = (list) => {
    if (!list.length) {
      setSubmitted(false);
      setTargetWord('');
    } else {
      const listCopy = [...list];
      const randomIndex = Math.floor(Math.random() * list.length);
      const randomWord = listCopy.splice(randomIndex, 1)[0];
      setTargetWord(randomWord);
      setWords(listCopy);
    }
  }

  const handleSubmit = () => {
    if (input.length) {
      const wordsList = input.split(',')
      setWords(wordsList);
      setInput('');
      setSubmitted(true);
      nextWord(wordsList);
    } else {
      window.alert('Pour continuer, la case mots doit avoir un contenu')
    }
  }


  useEffect(() => {

  })


  return (
    <div className="App">
      {
        submitted
        ? <>
            <p className={display}>{targetWord.trim()}</p>
            <button onClick={() => nextWord(words)}>Suivant</button>
          </>
        : <>
            <div style={{height: '10vh'}}></div>
            <label htmlFor='textInput'>Veuillez saisir la list de mot (séparez les mots par une virgule)</label>
            <input id='textInput' type='text' value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Valider</button>
            
            <hr />
            <span style={{verticalAlign: 'top'}}>Style d'affichage:</span>
            <div style={{display: 'inline-block', textAlign: 'left'}}>
              <input type='radio' id='original' name='display' checked={display === ''} onChange={() => setDisplay('')} />
              <label htmlFor='original' >Texte original</label> <br />

              <input type='radio' id='firstCap' name='display' checked={display === 'firstCap'} onChange={() => setDisplay('firstCap')} />
              <label htmlFor='firstCap' >1ere letter majuscule</label> <br />

              <input type='radio' id='allCaps' name='display' checked={display === 'allCaps'} onChange={() => setDisplay('allCaps')} />
              <label htmlFor='allCaps' >Tout majuscule</label> <br />
            </div>

          </>
        
      }
    </div>
  );
}

export default App;
