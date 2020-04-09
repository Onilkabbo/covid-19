import React from 'react';
import logo from '../../covid19.png';
import './Header.css';

const Header = () => (
    <header className="App-header">
        <div>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h3>Covid-19 Coronavirus Outbreak</h3>
    </header>
)

export default Header;
