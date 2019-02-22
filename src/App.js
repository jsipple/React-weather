import React, { Component } from 'react';
import './App.css';
import './components/weather'
import Weather from './components/weather';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'

library.add(faCloudShowersHeavy)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
        <p id="demo"></p>
      </div>
    );
  }
}

export default App;
