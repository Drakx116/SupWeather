import * as React from "react";
import {Redirect, withRouter} from "react-router-dom";
import cookie from 'react-cookies';
import { logout } from "../../API/logout";
import {Dashboard} from "../Dashboard/Dashboard";

class Logout extends React.Component
{
    componentDidMount() {
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
                <Redirect to={Dashboard} />
            </div>
        );
    }
}

export default withRouter(Logout);
