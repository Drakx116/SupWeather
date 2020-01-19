import * as React from "react";
import { Link } from "react-router-dom";
import './../styles/main.css';

export class GuestButtons extends React.Component {
    render() {
        return(
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
        );
    }
}
