import React, { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
            <p>{targetWord.trim()}</p>
            <button onClick={() => nextWord(words)}>Suivant</button>
          </>
        : <>
            <label>
              Veuillez saisir la list de mot (séparez les mots par une virgule)
              <input value={input} onChange={e => setInput(e.target.value)} />
            </label>
            <button onClick={handleSubmit}>Valider</button>
          </>
        
      }
    </div>
  );
}

export default App;
