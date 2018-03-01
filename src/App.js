import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
//import components
import Root from './components/Root';
import General from './components/General';
import MapPage from './components/Map';
import Login from './components/Login';
import AboutUs from './components/AboutUs';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root>
          <Route path='/' exact={true} component={General} />
          <Route path="/Maps" component={MapPage} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/Login" component={Login} />
        </Root>
      </BrowserRouter>
    );
  }
}

export default App;
