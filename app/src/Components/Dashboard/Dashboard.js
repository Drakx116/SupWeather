import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import cookie from "react-cookies";

export class Dashboard extends React.Component {
    render() {
        if(!cookie.load('token')) {
            this.props.history.push('/login');
        }
        return (
            <div className="component-container">
                <h2> Dashboard </h2>

                <GoogleMap />
            </div>
        );
    }
}
