import React from "react";
import cookie from 'react-cookies';

import { AuthNavbar } from "./templates/AuthNavbar";
import { GuestNavbar } from "./templates/GuestNavbar";

export class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isAuth: false };

        fetch('http://localhost:3000/auth/checkToken', {
            method: 'GET',
            headers: {
                'Authorization': cookie.load('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ isAuth: !!(data.data) })
            })
    }


    render() {

        let navbar = (this.state.isAuth) ? <AuthNavbar /> : <GuestNavbar />;

        return (
            <div className="container">
                { navbar }
            </div>
        );
    }
}
