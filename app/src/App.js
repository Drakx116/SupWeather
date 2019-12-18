import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="header">
            <h2> SupWeather </h2>
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/users"> Users </Link></li>
            </ul>
        </div>

        <Switch>
            <Route exact path="/">
                Dashboard
            </Route>
            <Route exact path="/users">
                Users
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
