import * as React from "react";
import { Link } from "react-router-dom";

export class GuestNavbar extends React.Component {
    render() {
        return(
            <ul>
                <li><Link to="/"> Dashboard </Link></li>
                <li><Link to="/login"> Login </Link></li>
            </ul>
        );
    }
}
