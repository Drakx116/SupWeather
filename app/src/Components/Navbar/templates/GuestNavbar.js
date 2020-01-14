import * as React from "react";
import { Link } from "react-router-dom";

import './../styles/main.css';
import brand from '../images/logo.png';

export class GuestNavbar extends React.Component {
    render() {
        return(
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/">
                        <div className="navbar-item">
                            <img className="navbar-brand-image" src={ brand } alt="SupWeather" />
                        </div>
                    </Link>

                    <button className="navbar-burger burger" id="burger-button" aria-label="menu" aria-expanded="false" data-target="burger-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="burger-menu" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to='/register'>
                                    <div className="button is-primary" id="register-navbar-button">
                                        Register
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/login">
                                    <div className="button is-light">
                                        Login
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
