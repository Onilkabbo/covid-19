import React from 'react';
import './App.css';

import Header from './components/header/Header';
import Globalcase from './components/Globalcase/Globalcase';
import Localcase from './components/LocalCase/Localcase';

function App() {
  return (
    <div className="container">
        <Header />
        <Globalcase />
        <Localcase />
    </div>
  );
}

export default App;
