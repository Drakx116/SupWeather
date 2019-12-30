import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import cookie from "react-cookies";

import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Security/Login";
import Logout from "./Components/Security/Logout";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  // Checks if token exists
  let token = !!(cookie.load('token'));

  return (
    <Router>
        <div className="header">
            <h2> SupWeather </h2>
            <Navbar isAuth={ token }/>
        </div>

        <Switch>
            <Route exact path="/" component={Dashboard} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/logout" component={Logout} />
        </Switch>
    </Router>
  );
}

export default App;
