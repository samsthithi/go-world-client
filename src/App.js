import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './Components/NavBar'
import Creategroup from './Components/Creategroup'
import Landing from './Components/Landing'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Groups from './Components/Groups'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/creategroup" component={Creategroup} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;