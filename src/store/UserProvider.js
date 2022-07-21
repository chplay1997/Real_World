import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

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
    const value = { user, setUser, isEmail, isPassword };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
