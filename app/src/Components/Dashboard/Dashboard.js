import React from "react";
import cookie from "react-cookies";

export class Dashboard extends React.Component {
    render() {

        let token = cookie.load('token');
        let message = (token) ? 'Auth with token : ' + token : 'Guest';

        return (
            <div className="component-container">
                <h2> Dashboard </h2>
                <p> { message }</p>
            </div>
        );
    }
}
