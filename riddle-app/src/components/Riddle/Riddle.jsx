import React from 'react'

function Riddle({ riddle }) {
    return (
        <div className="div--riddle--container">
            <h4>{riddle.question}</h4>
            <form action="input">
                <input type="text"/><br></br>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Riddle
