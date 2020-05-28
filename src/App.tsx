import React from 'react';
import { Provider } from 'react-redux'
import logo from './logo.svg';
import './App.css';

import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import { Store } from 'redux';
import { ApplicationState } from './store/index';

interface MainProps {
  store: Store<ApplicationState>
}

const App: React.FC<MainProps> = ({ store }) => {
  return (
    <Provider store={store}>
    <div>
      <Sidebar />

      <div className="page-content">
        <MainContent />
      </div>
      
    </div>
    </Provider>
  );
}

export default App;
