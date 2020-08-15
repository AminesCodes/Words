import React, { useState, useEffect } from 'react';
// import useFitText from "use-fit-text";
// import FitText from '@kennethormandy/react-fittext'

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [display, setDisplay] = useState('');
  const [tempD, setTempD] = useState('block');
  const [timeOp, setTimeOp] = useState('3000');
  const [fSize, setFSize] = useState('250');
  const [fFamily, setFFamily] = useState('Isabelle');
  
  const times = ['1000', '2000', '3000', '4000', '5000', '6000', '7000'];
  const fonts = ['Anton', 'Bowlby One SC', 'Isabella', 'Isabelle']
  // const { fontSize, ref } = useFitText({ maxFontSize: 1500, minFontSize: 500});

  let fWeight = 'normal';
  if (fFamily === 'Isabelle') {
    fWeight = 'bolder';
  }

  const tempDisplay = () => {
    setTimeout(() => {
      // setTempD('none');
    }, Number(timeOp));
  }

  const nextWord = (list) => {
    if (!list.length) {
      setSubmitted(false);
      setTargetWord('');
    } else {
      let listCopy = [...list];
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
      let wordsList = input.split(',');
      wordsList = wordsList.filter(wrd => wrd !== '');
      wordsList = wordsList.map(wrd => wrd.trim());
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
            <div className='tools'>
              <label>Taille Texte
                <input type='range' id='fontSize' min='100' max='850' value={fSize}  onChange={e => setFSize(e.target.value)} />
              </label>
              <label> Police du text: 
                <select value={fFamily} onChange={e => setFFamily(e.target.value)}> 
                  {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
              </label>
              <span><button onClick={() => nextWord(words)}>Suivant</button></span>
            </div>

            <div id='word' className={display} style={{display: tempD, fontFamily: fFamily, fontSize: `${fSize}px`, fontWeight: fWeight}}>
            {/* <div id='word' ref={ref} className={display} style={{fontSize, display: tempD, marginTop: 20}}> */}
              {targetWord}
            </div>
            {/* <FitText minFontSize={800} maxFontSize={2000} id='word' className={display} style={{display: tempD, marginTop: 20}}>
              {targetWord}
            </FitText> */}
          </>
        : <>
            <form onSubmit={handleSubmit} >
              <label htmlFor='textInput'>Veuillez saisir la list de mot (séparez les mots par une virgule)</label>
              <input id='textInput' type='text' value={input} onChange={e => setInput(e.target.value)} />
              <button >Valider</button>
            </form>
            
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
              Temps d'affichage (sec): 
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
