import React from 'react'
import './Riddle.css'

function Riddle({ riddles, handleChange, handleSubmit, incrementCount, count, decrementCount, isSolved }) {
    return (
            <div className={isSolved.lenght !== 0 && isSolved.includes(riddles[count].id) ? "div--riddle--container--solved" : "div--riddle--container"}>
                {riddles.length !== 0 ? 
                <div>
                    <h4>{riddles[count].question}</h4>
                    {isSolved.lenght !== 0 && isSolved.includes(riddles[count].id) ? <p>Completed!</p> :
                    <form className="form--container" action="input" onSubmit={handleSubmit}>
                        <input type="text" onChange={handleChange}/>
                        <input type="submit"/>
                    </form>}
                    <div className="div--button--container">
                        <button onClick={decrementCount}>Previous</button>  
                        <button onClick={incrementCount}>Next</button>
                    </div>
                </div>
                : <div></div>}
            </div>
    )
}

export default Riddle
