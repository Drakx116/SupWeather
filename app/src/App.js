import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { Dashboard } from "./Components/Dashboard/Dashboard";
import Login from "./Components/Security/Login";

function App() {
  return (
    <Router>
        <div className="header">
            <h2> SupWeather </h2>
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/login"> Login </Link></li>
            </ul>
        </div>

        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
