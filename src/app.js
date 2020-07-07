import React from 'react';

import ToDo from './components/todo/todo-connected.js';
import SettingsProvider from './context/settings.js';


export default function App() {

  return (
    <>
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    </>
  );
}