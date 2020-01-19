import * as React from "react";
import {Redirect, withRouter} from "react-router-dom";
import cookie from 'react-cookies';
import { logout } from "../../API/logout";

class Logout extends React.Component
{
    constructor(props) {
        super(props);

        const token = cookie.load('token');
        logout(
            {
                token: token
            },
            this.props
        );
    }

    render() {
        return (
            <div>
                <Redirect to="/login"  />
            </div>
        );
    }
}

export default withRouter(Logout);
