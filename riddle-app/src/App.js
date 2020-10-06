import React, { useState, useEffect } from 'react';
import { firebase } from "./firebase/config";
import './App.css';
import Riddle from './components/Riddle/Riddle';
import Login from './components/Login/Login';
import LeaderBoard from './components/Leaderboard/LeaderBoard';

function App() {

const [ riddles, setRiddles ] = useState('');
const [ userInput, setUserInput ] = useState('');
const [ count, setCount ] = useState(0);
const [ points, setPoints ] = useState(0);
const [ isSolved, setIsSolved ] = useState([])
const [ isLogin, setisLogin ] = useState(false)
const [ user, setUser ] = useState('')
const [ userValidation, setUserValidation ] = useState(false)
const [ firstClue, setFirstClue ] = useState(false)
const [ secondClue, setSecondClue ] = useState(false)
const [ wrongAnswer, setWrongAnswer ] = useState(false)
const [ leaderboard, setLeaderboard ] = useState([])
const [ viewLeaderboard, setViewLeaderboard ] = useState(false)

const handleChange = (e) => setUserInput(e.target.value);

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  addpoints()
}

const handleSubmitLogin = async (e) => {
  e.preventDefault()
  e.target.reset()
  let users = [];

  firebase.firestore().collection('users').get().then((querySnapshot) => {
    querySnapshot.docs.map((doc) => {
     return users.push(doc.data().username)
    })
    if(userInput.length < 3) {
      setUserValidation(true)
    } else if (users.includes(userInput)) {
      setisLogin(true)
      setUser(userInput)
      getSolved()
      getPoints()
    } else {
      firebase.firestore().collection('users').doc(userInput).set({ username: userInput, solved: [], points: 0 })
      .then(() => getSolved)
      setisLogin(true)
      setUser(userInput)
    }
  })
}

const getSolved = async () => {
  const doc = firebase.firestore().collection('users')
  await doc.doc(userInput).get()
  .then((doc) => {
    doc.data().solved.length > 0 ? doc.data().solved.map((id) => {
      return setIsSolved((prevState => [...prevState, id])) 
    }) : setIsSolved([])
  }) 
}

const getPoints = async () => {
  const data = firebase.firestore().collection('users').doc(userInput)
  await data.get().then((doc) => setPoints(doc.data().points))
}

const incrementCount = () => {
  const button = document.getElementById('firstClue');
  if (count !== riddles.length - 1) {
    setCount(count + 1)
    setFirstClue(false)
    setSecondClue(false)
    if (button !== null && button !== undefined) {
      button.innerHTML = "Get Clue"
    } 
  }
}

const decrementCount = () => {
  const button = document.getElementById('firstClue');
  if (count !== 0) {
    setCount(count - 1)
    setFirstClue(false)
    setSecondClue(false)
    if (button !== null && button !== undefined) {
      button.innerHTML = "Get Clue"
    } 
  }
}

const useFirstClue = () => {
  const button = document.getElementById('firstClue')
  setFirstClue(true)
  button.innerHTML = 'Get Clue' ? button.innerHTML = 'Get Second Clue' : button.innerHTML = 'Get Clue'
}

const useSecondClue = () => {
  setSecondClue(true)
}

const addpoints = () => {
  if (userInput.toLowerCase().includes(riddles[count].answer.toLowerCase()) && secondClue) {
    setPoints(points + 1)
    firebase.firestore().collection('users').doc(user).update({
      points: points + 1,
      solved: firebase.firestore.FieldValue.arrayUnion(riddles[count].id)
    })
    setIsSolved(prevState => [...prevState, riddles[count].id])
  } else if (userInput.toLowerCase().includes(riddles[count].answer.toLowerCase()) && firstClue) {
      setPoints(points + 3)
      firebase.firestore().collection('users').doc(user).update({
        points: points + 3,
        solved: firebase.firestore.FieldValue.arrayUnion(riddles[count].id)
      })
      setIsSolved(prevState => [...prevState, riddles[count].id])
  } else if (userInput.toLowerCase().includes(riddles[count].answer.toLowerCase())) {
      setPoints(points + 5)
      firebase.firestore().collection('users').doc(user).update({
        points: points + 5,
        solved: firebase.firestore.FieldValue.arrayUnion(riddles[count].id)
      })
      setIsSolved(prevState => [...prevState, riddles[count].id])
  } else {
      setWrongAnswer(true)
      setTimeout(() => setWrongAnswer(false), 2500)

  }
}

useEffect(() => {
  const data = firebase.firestore().collection('users');
  data.onSnapshot((querySnapshot) => {
    setLeaderboard([])
    querySnapshot.docs.map((doc) => {
      return setLeaderboard((prevState) => [ ...prevState, {
        user: doc.data().username,
        points: doc.data().points
      }])
    })
  })
  return () => {
    
  }
}, [])

const getAllPoints = () => {
  setViewLeaderboard(true)
}

const backToRiddles = () => {
  setViewLeaderboard(false)
}

useEffect(() => {
  const data = firebase.firestore().collection('riddles')
    data.get().then((querySnapshot) => {
      querySnapshot.docs.map((doc) => setRiddles((prevState) => [ ...prevState, {
        id: doc.id,
        question: doc.data().question,
        answer: doc.data().answer,
        firstClue: doc.data().firstClue,
        secondClue: doc.data().secondClue
      }
      ]))
    })
  return () => {
    
  }
}, [])

  return (
    <div className="App">
      <header className="header">
        <h3 className="h3--title">Riddle Me This...</h3>
        {isLogin ? <h3 className="h3--points">{user} Points: {points}</h3> : <div></div>}
        <div>
          {viewLeaderboard ? <button className="button--leaderboard" onClick={backToRiddles}>Back To Riddles</button> : <div></div>}
          {isLogin ? <button className="button--leaderboard" onClick={getAllPoints}>Leaderboard</button> : <div></div>}
        </div>
      </header>

      {viewLeaderboard ? <LeaderBoard leaderboard={leaderboard}/> : <div></div>}

      {isLogin && !viewLeaderboard ? 
              <Riddle 
              riddles={riddles}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
              count={count}
              isSolved={isSolved}
              firstClue={firstClue}
              useFirstClue={useFirstClue}
              useSecondClue={useSecondClue}
              secondClue={secondClue}
              wrongAnswer={wrongAnswer}
      />
      : <div></div>}
      {!isLogin ?               
              <Login 
              handleChange={handleChange}
              handleSubmitLogin={handleSubmitLogin}
              userValidation={userValidation}/>
               : <div></div>}
    </div>
  );
}

export default App;
