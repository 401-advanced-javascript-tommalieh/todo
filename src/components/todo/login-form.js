import React from 'react'
import {useState, useEffect, useContext} from 'react';
import { LoginContext } from '../../context/login-auth.js';

function LoginForm(props){

    const [userInfo, setUserInfo] = useState({});
    const loginContext = useContext(LoginContext);

    const changeHandler = (e) => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.reset()
        loginContext.loginFunction(userInfo.username, userInfo.password);
        console.log(loginContext)

    }

    return(

        !loginContext.loggedInState ?
        <form onSubmit={submitHandler}>
            <input type='text' name='username' placeholder='Enter Username' required onChange={changeHandler} />
            <input type='text' name='password' placeholder='Enter Password' required onChange={changeHandler} />
            <button type='submit'>Login</button>
        </form>
        :
        <form>
            <button type='submit' onClick={loginContext.logOutFunction}>Logout</button>
        </form>
    )
}

export default LoginForm;