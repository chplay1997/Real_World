import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({ children }) {
    const token = localStorage.getItem('jwtToken');
    const [user, setUser] = useState('');
    const [messageLoading, setMessageLoading] = useState('');

    //Get user
    useEffect(() => {
        if (!token) {
            return;
        }
        axios
            .get('https://api.realworld.io/api/user', {
                headers: {
                    accept: 'application/json',
                    authorization: 'Token ' + token,
                },
            })
            .then((response) => {
                setUser(response.data.user);
                localStorage.setItem('jwtToken', response.data.user.token);
            })
            .catch((err) => console.log(err));
    }, [token]);

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
                article: {
                    title: input.title,
                    description: input.description,
                    body: input.body,
                    tagList: input.tagList,
                },
            },
            {
                headers: {
                    accept: 'application/json',
                    authorization: 'Token ' + (token || ''),
                },
            },
        )
            .then((response) => {
                if (response.data.hasOwnProperty('user')) {
                    localStorage.setItem('jwtToken', response.data.user.token);
                    setUser(response.data.user);
                }
                input.navigate(input.path || '/');
            })
            .catch((err) => {
                return err;
            });
    };

    //click like and dislike
    const like = (slug) => {
        return axios.post(
            `https://api.realworld.io/api/articles/${slug}/favorite`,
            {},
            {
                headers: {
                    accept: 'application/json',
                    authorization: 'Token ' + (token || ''),
                },
            },
        );
    };
    const disLike = (slug) => {
        return axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
            headers: {
                accept: 'application/json',
                authorization: 'Token ' + (token || ''),
            },
        });
    };

    //Set view loading articles
    const setMessage = (e) => {
        if (!e.target.closest('.active')) {
            setMessageLoading('Loading articles...');
        }
    };

    //action following
    const actionProfile = (input) => {
        return axios[input.method](`https://api.realworld.io/api/profiles/${input.name}${input.target}`, {
            headers: {
                accept: 'application/json',
                authorization: 'Token ' + (localStorage.getItem('jwtToken') || ''),
            },
        })
            .then((response) => response)
            .catch((err) => err);
    };

    const value = {
        user,
        setUser,
        isEmail,
        isPassword,
        sendData,
        like,
        disLike,
        messageLoading,
        setMessage,
        setMessageLoading,
        actionProfile,
    };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
