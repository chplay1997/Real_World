import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from '~/reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { StoreProvider } from '~/store';

// const User = React.createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StoreProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </StoreProvider>
    </React.StrictMode>,
);

reportWebVitals();
