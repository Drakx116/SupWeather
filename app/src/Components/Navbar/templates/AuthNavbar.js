import * as React from "react";
import { Link } from "react-router-dom";

export class AuthNavbar extends React.Component {
    render() {
        return(
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/logout"> Logout </Link></li>
            </ul>
        );
    }
}
