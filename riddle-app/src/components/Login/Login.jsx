import React from 'react'

function Login({ handleChange, handleSubmitLogin }) {
    return (
        <div>
            <form action="input" onSubmit={handleSubmitLogin}>
                <input type="text" onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login
