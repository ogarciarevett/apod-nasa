import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApodComponent from './components/apod/ApodComponent';
import NotMatch from './components/NotMatch';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/' component={ApodComponent} />
            <Route component={NotMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
