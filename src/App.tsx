import React from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import MainContent from './components/MainContent';

function App() {
  return (
    <div>
      <Navigation/>
      <MainContent/>
    </div>
  );
}

export default App;
