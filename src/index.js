import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import Context from './store/Context';

// const User = React.createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{ color: 'red' }}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Context.Provider>
    </React.StrictMode>,
);

reportWebVitals();
