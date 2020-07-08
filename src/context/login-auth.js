
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const apiServer = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com';
const secret = process.env.SECRET || 'supersecret';

export const LoginContext = React.createContext()

function LoginProvider(props) {
    const [loggedInState, setLoggedInState] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    const logout = () => {
        cookie.remove('auth')
        setLoginState({}, null, false);
    }
    
    const login = async (username, password) => {
        // superagent.post(`${apiServer}/signin`)
        //     .set('authorization', `Basic ${btoa(`${username}:${password}`)}`)
        //     .then(userObject => {
        //         validateToken(userObject.body.token);
        //     }).catch(console.error);
        console.log('1',user)
        console.log('1',token)
        console.log('1',loggedInState)

        const userObject = await superagent.post(`${apiServer}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
        validateToken(userObject.body.token);
    }

    const validateToken = (token) => {
        try {
            const user = jwt.verify(token, secret);
            setLoginState(user, token, true);
        console.log('2',user)
        console.log('2',token)
        console.log('2',loggedInState)


        } catch (err) {
            setLoginState({}, null, false);
            console.log(err.message);
        }
    }

    const setLoginState = (user, token, loggedInState) => {
        cookie.save('auth', token);
        setLoggedInState(loggedInState);
        setUser(user);
        setToken(token);
    }

    useEffect(() => {
        const token = cookie.load('auth');
        validateToken(token);
    }, [])

    const state = {
        loggedInState,
        user,
        token,
        changeLoggedInState: setLoggedInState,
        changeUser: setUser,
        changeToken: setToken,
        loginFunction: login,
        logOutFunction: logout,
        validateTokenFunction: validateToken,
        setloginStateFunction: setLoginState
    }

    return(
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;