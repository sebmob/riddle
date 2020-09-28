import React, { useState, useEffect } from 'react';
import { firebase } from "./firebase/config";
import './App.css';
import Riddle from './components/Riddle/Riddle';

function App() {

const [ riddle, setRiddle ] = useState('');
const [ userInput, setUserInput ] = useState('');
const [ answerCorrect, setAnswerCorrect ] = useState(false)

const handleChange = (e) => setUserInput(e.target.value);

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  if (userInput === riddle.answer) {
    setAnswerCorrect(true);
  }
}

useEffect(() => {
  firebase
    .firestore()
    .collection('riddles')
    .doc('prQUPpjodMw7Gx0s8lFy')
    .get()
    .then((doc) => setRiddle(doc.data()))
  return () => {
    
  }
}, [])

  return (
    <div className="App">
      <header className="header">Riddle Me This...</header>
        <Riddle riddle={riddle} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
