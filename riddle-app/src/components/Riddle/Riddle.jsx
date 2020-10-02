import React from 'react'
import './Riddle.css'
import logo from '../../icons/arrow.svg'
import Clues from '../Clues/Clues'

function Riddle({ riddles, handleChange, handleSubmit, incrementCount, count, decrementCount, isSolved }) {
    return (
            <div className={isSolved.lenght !== 0 && isSolved.includes(riddles[count].id) ? "div--riddle--container--solved" : "div--riddle--container"}>
                {riddles.length !== 0 ? 
                <div>
                    <h4>{riddles[count].question}</h4>
                    {isSolved.lenght !== 0 && isSolved.includes(riddles[count].id) ? <p className="p--completed">Completed!</p> :
                    <form className="form--container" action="input" onSubmit={handleSubmit}>
                        <input className="input--answer" type="text" onChange={handleChange}/>
                        <input className="input--answer--submit" type="submit" value="Solve"/>
                    </form>}
                    <Clues />
                    <div className="div--button--container">
                        <img className="img--left--arrow" onClick={decrementCount} src={logo} alt="arrow-icon"/>
                        <img className="img--right--arrow" onClick={incrementCount} src={logo} alt="arrow-icon"/>
                    </div>
                </div>
                : <div></div>}
            </div>
    )
}

export default Riddle
