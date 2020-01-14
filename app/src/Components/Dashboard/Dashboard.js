import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";
import cookie from "react-cookies";
import {AddCityForm} from "../Forms/AddCityForm/AddCityForm";

export class Dashboard extends React.Component {
    render() {
        if(!cookie.load('token')) {
            this.props.history.push('/login');
        }
        return (
            <div className="component-container">
                <GoogleMap />
                <AddCityForm />
            </div>
        );
    }
}
