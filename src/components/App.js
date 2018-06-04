import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Foot from './Footer';
import logo from './logo.svg';
import Foot from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Foot />
      </div>
    );
  }
}

export default App;
