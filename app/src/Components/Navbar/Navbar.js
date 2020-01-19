import React from "react";
import cookie from 'react-cookies';

import { AuthButtons } from "./templates/AuthButtons";
import { GuestButtons } from "./templates/GuestButtons";
import {Link} from "react-router-dom";
import brand from "./images/logo.png";

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

        let buttons = (this.state.isAuth)
            ? <AuthButtons />
            : <GuestButtons />;

        return (
            <div className="container">
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

                    { buttons }
                </nav>
            </div>
        );
    }
}
