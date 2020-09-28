import React, { useState, useEffect } from 'react';
import { firebase } from "./firebase/config";import './App.css';
import Riddle from './components/Riddle/Riddle';

function App() {

const [ riddle, setRiddle ] = useState('');

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
      <Riddle riddle={riddle} />
    </div>
  );
}

export default App;
