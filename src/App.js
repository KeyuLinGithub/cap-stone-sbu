import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
//import components
import Root from './components/Root';
import General from './components/General';
import Map from './components/Map';
import Login from './components/Login';
import AboutUs from './components/AboutUs';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path={"/"} component={Root}>
          <Route component={General} />
          <Route path={"Map"} component={Map} />
          <Route path={"AboutUs"} component={AboutUs} />
          <Route path={"Login"} component={Login} />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
