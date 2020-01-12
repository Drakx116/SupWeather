import React from "react";

import { AuthNavbar } from "./templates/AuthNavbar";
import { GuestNavbar } from "./templates/GuestNavbar";

export class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isAuth: this.props.isAuth };
    }


    render() {

        let navbar = (this.state.isAuth) ? <AuthNavbar /> : <GuestNavbar />;

        return (
            <div className="navbar">
                { navbar }
            </div>
        );
    }
}
