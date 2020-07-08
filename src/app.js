import React from 'react';

import ToDo from './components/todo/todo-connected.js';
import SettingsProvider from './context/settings.js';
import LoginProvider from './context/login-auth.js';


export default function App() {

  return (
    <>
      <LoginProvider>
        <SettingsProvider>
          <ToDo />
        </SettingsProvider>
      </LoginProvider>  
    </>
  );
}