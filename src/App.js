import React, { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [display, setDisplay] = useState('');
  const [tempD, setTempD] = useState('block');
  const [timeOp, setTimeOp] = useState('3000');
  const times = ['1000', '2000', '3000', '4000', '5000', '6000', '7000'];

  const tempDisplay = () => {
    setTimeout(() => {
      setTempD('none');
    }, 3000);
  }

  const nextWord = (list) => {
    if (!list.length) {
      setSubmitted(false);
      setTargetWord('');
    } else {
      const listCopy = [...list];
      listCopy.filter(wrd => wrd !== '')
      const randomIndex = Math.floor(Math.random() * list.length);
      const randomWord = listCopy.splice(randomIndex, 1)[0];
      setTargetWord(randomWord);
      setWords(listCopy);
      setTempD('block');
      tempDisplay();
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
      <div style={{height: '10vh'}}></div>
      {
        submitted
        ? <>
            <button onClick={() => nextWord(words)}>Suivant</button>
            <p className={display} style={{display: tempD}}>{targetWord.trim()}</p>
          </>
        : <>
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

            <hr />
            <span>
              Temps d'affichage (s): 
              <select value={timeOp} onChange={e => setTimeOp(e.target.value)}> 
                {times.map(t => <option key={t} value={t}>{t[0]}</option>)}
              </select>
            </span>
          </>
        
      }
    </div>
  );
}

export default App;
