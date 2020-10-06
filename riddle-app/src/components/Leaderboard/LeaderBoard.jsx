import React from 'react'
import './LeaderBoard.css'


function LeaderBoard({ leaderboard }) {
    return (
        <div className="div--table--container">
            <table className="table--leaderboard">
            <tr>
                <th>Username</th>
                <th>Points</th>
            </tr>
                {leaderboard
                .sort((a, b) => b.points - a.points)
                .map((user, i) => {
                return  <tr key={i}>
                            <td>{user.user}</td>
                            <td>{user.points}</td>
                        </tr>

                })}
            </table>
        </div>
    )
}

export default LeaderBoard
