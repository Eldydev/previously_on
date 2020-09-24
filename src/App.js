import React, { Component } from "react";
import NavBar from "./components/NavBar";
import MemberSeries from "./components/MemberSeries"
import Home from './components/Home.js'

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import login from './components/login';
import login2 from './components/login2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: []
    }
  }

  render() {

    return (
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={login} />
            <Route path="/login2" component={login2} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    );
  }


}

export default App;