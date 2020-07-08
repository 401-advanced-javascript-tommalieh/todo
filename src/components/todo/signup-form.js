import React from 'react'
import { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { LoginContext } from '../../context/login-auth.js'

function SignUpForm(props) {

    const apiServer = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com';

    const [userInfo, setUserInfo] = useState({});
    const loginContext = useContext(LoginContext);

    const changeHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.reset()
        superagent.post(`${apiServer}/signup`)
            .send({
                username: `${userInfo.username}`,
                password: `${userInfo.password}`,
                email: `${userInfo.email}`,
            })
            .then(userObject => {
                alert(`Registered ${userObject}`)
            }).catch(console.error);

    }

    return (

        !loginContext.loggedInState ?
            <form onSubmit={submitHandler}>
                <input type='text' name='username' placeholder='Enter Username' required onChange={changeHandler} />
                <input type='text' name='password' placeholder='Enter Password' required onChange={changeHandler} />
                <input type='email' name='email' placeholder='Enter Email' required onChange={changeHandler} />

                <button type='submit'>SignUp</button>
            </form>
            :
            null
    )
}

export default SignUpForm;