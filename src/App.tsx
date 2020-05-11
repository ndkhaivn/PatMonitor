import React from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Sidebar />

      <div className="page-content">
        <MainContent />
      </div>
      
    </div>
  );
}

export default App;
