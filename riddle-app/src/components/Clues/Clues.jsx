import React from 'react'
import './Clues.css'


function clues({ firstClue, useFirstClue, count, riddles, secondClue, useSecondClue, isSolved }) {
    return (
        <div className="div--clue--container">
            <button id="firstClue" className="button--clues" onClick={firstClue ? useSecondClue : useFirstClue }>Get Clue</button>
            {firstClue ? <p className="p--firstClue">{riddles[count].firstClue}</p> : <p></p>}
            {secondClue ? <p className="p--secondClue">{riddles[count].secondClue}</p> : <p></p>}
        </div>
    )
}

export default clues
