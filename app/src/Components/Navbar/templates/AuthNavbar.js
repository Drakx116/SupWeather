import * as React from "react";
import { Link } from "react-router-dom";

export class AuthNavbar extends React.Component {
    render() {
        return(
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/">
                        <div className="navbar-item">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="SupWeather" />
                        </div>
                    </Link>

                    <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="burger-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="burger-menu" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link to="/logout">
                                <div className="buttons">
                                    <div className="button is-danger">
                                        <strong>Log out</strong>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
