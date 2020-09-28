import React from 'react'
import './Riddle.css'

function Riddle({ riddle, handleChange, handleSubmit }) {
    return (
            <div className="div--riddle--container">
                <h4>{riddle.question}</h4>
                <form action="input" onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange}/><br></br>
                    <input type="submit"/>
                </form>
            </div>
    )
}

export default Riddle
