import React, { useState, useEffect } from 'react';

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const decreaseIndex = () => {
    let targetIndex = index - 1;
    if (targetIndex < 0) {
      targetIndex = words.length - 1;
    }
    setIndex(targetIndex);
  }

  const increaseIndex = () => {
    let targetIndex = index + 1;
    if (targetIndex >= words.length) {
      targetIndex = 0;
    }
    setIndex(targetIndex);
  }

  const handleSubmit = () => {
    if (input.length) {
      setWords(input.split(','));
      setInput('');
      setSubmitted(true);
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
            <div>{words[index].trim()}</div>
            <button onClick={decreaseIndex}>Précédent</button>
            <button onClick={increaseIndex}>Suivant</button>
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
