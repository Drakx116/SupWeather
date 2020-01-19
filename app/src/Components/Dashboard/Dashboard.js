import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import cookie from "react-cookies";
import {AddCityForm} from "./AddCityForm/AddCityForm";
import Redirect from "react-router-dom/es/Redirect";

export class Dashboard extends React.Component {
    render() {
        let redirection = undefined;
        if(!(cookie.load('token') && cookie.load('user'))) {
            redirection = <Redirect to="/logout" />
        }
        return (
            <div className="component-container">
                { redirection }
                <h1 className="page-title"> My Cities </h1>
                <AddCityForm />
                <GoogleMap />
            </div>
        );
    }
}
