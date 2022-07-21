import { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const value = { user, setUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
