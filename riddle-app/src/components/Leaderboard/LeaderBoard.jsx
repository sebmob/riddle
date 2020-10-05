import React from 'react'

function LeaderBoard({ leaderboard }) {
    return (
        <div>
            {leaderboard
            .sort((a, b) => b.points - a.points)
            .map((user, i) => {
               return <div key={i}>
                        <tr>
                            <th>{user.user}</th>
                            <th>{user.points}</th>
                        </tr>
                      </div>
            })}
        </div>
    )
}

export default LeaderBoard
