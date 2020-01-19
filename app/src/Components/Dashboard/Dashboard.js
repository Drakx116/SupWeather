import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import cookie from "react-cookies";
import {AddCityForm} from "./AddCityForm/AddCityForm";

export class Dashboard extends React.Component {
    render() {
        if(!cookie.load('token')) {
            this.props.history.push('/login');
        }
        return (
            <div className="component-container">
                <h1 className="page-title"> My Cities </h1>
                <AddCityForm />
                <GoogleMap />
            </div>
        );
    }
}
