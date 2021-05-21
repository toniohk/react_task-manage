import React from 'react';
import { CookiesProvider } from 'react-cookie';

import AppContextProvider from './context/AppContext';
import UserContextProvider from './context/UserContext';
import Views from './views';

import './assets/scss/custom.scss';

function App() {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <UserContextProvider>
          <Views />
        </UserContextProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}

export default App;
