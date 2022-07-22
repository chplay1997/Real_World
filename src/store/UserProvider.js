import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({ children }) {
    const token = localStorage.getItem('jwtToken');
    const [user, setUser] = useState('');
    //Get user
    useEffect(() => {
        if (!token) {
            return;
        }
        axios
            .get('https://api.realworld.io/api/user', {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Orgin': '*',
                    'content-type': 'application/json',
                    Authorization: 'Token ' + token,
                },
            })
            .then((response) => {
                setUser(response.data.user);
                console.log(response.data.user);
            })
            .catch((err) => console.log(err));
    }, [token]);
    console.log('run context');

    //regex email
    const isEmail = (email) => {
        const regexEmail =
            // eslint-disable-next-line
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (email.match(regexEmail)) {
            return true;
        }
        return false;
    };

    //regex password
    const isPassword = (password) => {
        const regexPassword = /[a-zA-Z0-9]{8,}/;
        if (password.match(regexPassword)) {
            return true;
        }
        return false;
    };

    //Call api and send data
    const sendData = (input) => {
        console.log(input);
        return axios[input.method](
            input.api,
            {
                user: {
                    image: input.image || '',
                    username: input.userName,
                    bio: input.bio || '',
                    email: input.email,
                    password: input.password,
                },
            },
            {
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Orgin': '*',
                    'content-type': 'application/json',
                    Authorization: 'Token ' + (input.token || ''),
                },
            },
        )
            .then((response) => {
                console.log(response);
                localStorage.setItem('jwtToken', response.data.user.token);
                setUser(response.data.user);
                input.navigate(input.path || '/');
            })
            .catch((err) => {
                return err;
            });
    };
    const value = { user, setUser, isEmail, isPassword, sendData };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
