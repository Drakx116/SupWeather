import * as React from "react";
import { Link } from "react-router-dom";

export class AuthButtons extends React.Component {
    render() {
        return(
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
        );
    }
}
