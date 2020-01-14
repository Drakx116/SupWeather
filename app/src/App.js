import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";

import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Security/Login";
import Logout from "./Components/Security/Logout";
import { Navbar } from "./Components/Navbar/Navbar";
import {PageNotFound} from "./Components/Errors/PageNotFound";
import {City} from "./Components/City/City";
import {Register} from "./Components/Security/Register";

function App() {
  // Checks if token exists
  let token = !!(cookie.load('token'));

  return (
    <Router>
        <div className="header">
            <Navbar isAuth={ token }/>
        </div>

        <div className="container">
            <Switch>
                {/* Main routes */}
                <Route exact path="/" component={ Dashboard } />

                <Route path="/city/:city" component={ City } />

                {/* Security */}
                <Route exact path="/register" component={ Register } />

                <Route exact path="/login" component={ Login } />

                <Route exact path="/logout" component={ Logout } />

                {/* Redirection */}
                <Route path="/not-found" component={ PageNotFound } />

                <Redirect to="/not-found" />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
