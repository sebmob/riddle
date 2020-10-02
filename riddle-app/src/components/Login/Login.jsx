import React from 'react'
import './Login.css'


function Login({ handleChange, handleSubmitLogin, userValidation }) {
    return (
        <div className="div--login--container">
            <form className="form--container" action="input" onSubmit={handleSubmitLogin}>
                <label htmlFor="">Login with your username, if you haven't played before please choose a username.</label>
                <input className="input--login" type="text" placeholder="Username" onChange={handleChange}/>
                <input className="input--login--submit" type="submit" value="Login"/>
                {userValidation ? <p>Username needs to be atleast 3 characters long</p> : <p></p>}
            </form>
        </div>
    )
}

export default Login
