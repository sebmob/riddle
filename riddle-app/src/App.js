import React, { useState, useEffect } from 'react';
import { firebase } from "./firebase/config";
import './App.css';
import Riddle from './components/Riddle/Riddle';

function App() {

const [ riddles, setRiddles ] = useState('');
const [ userInput, setUserInput ] = useState('');
const [ count, setCount ] = useState(0);
const [ points, setPoints ] = useState(0);
const [ isSolved, setIsSolved ] = useState({})

const handleChange = (e) => setUserInput(e.target.value);

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  if (userInput.toLowerCase() === riddles[count].answer.toLowerCase()) {
    setPoints(points + 5)
    setIsSolved({
      solved: true,
      id: count
    })
    
  }
}

const incrementCount = () => {
  if (count !== riddles.length - 1) {
    setCount(count + 1)
  }
}

const decrementCount = () => {
  if (count !== 0) {
    setCount(count - 1)
  }
}

useEffect( () => {
  const data = firebase.firestore().collection('riddles')
    data.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => setRiddles((prevState) => [ ...prevState, doc.data() ]))
    })
  return () => {
    
  }
}, [])

  return (
    <div className="App">
      <header className="header">
        <h3 className="h3--title">Riddle Me This...</h3>
        <h3 className="h3--points">Points: {points}</h3>
      </header>
        <Riddle riddles={riddles}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                incrementCount={incrementCount}
                decrementCount={decrementCount}
                count={count}
                isSolved={isSolved}
        />
    </div>
  );
}

export default App;
