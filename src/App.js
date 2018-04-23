import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
//import components
import Root from './components/Root';
import General from './components/General';
import MapPage from './components/Map';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import Admin from './components/Admin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Root>
          <Route path={process.env.PUBLIC_URL +'/'} exact={true} component={General} />
          <Route path={process.env.PUBLIC_URL +'/Maps'} component={MapPage} />
          <Route path={process.env.PUBLIC_URL +'/AboutUs'} component={AboutUs} />
          <Route path={process.env.PUBLIC_URL +'/SignUp'} component={SignUp} />
          <Route path={process.env.PUBLIC_URL +'/Admin'} component={Admin} />
        </Root>
      </BrowserRouter>
    );
  }
}

export default App;
