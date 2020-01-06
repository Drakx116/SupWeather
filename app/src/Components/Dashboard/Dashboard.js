import React from "react";
import GoogleMap from "../GoogleMap/GoogleMap";

export class Dashboard extends React.Component {
    render() {
        return (
            <div className="component-container">
                <h2> Dashboard </h2>

                <GoogleMap />
            </div>
        );
    }
}
