import React from "react";

import './Marker.css';

export class Marker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url : "/city/" + this.props.text.toLowerCase()
        };
    }

    render() {
        return (
            <a href={this.state.url}>
                <div className='google-maps-marker'>
                    <div className="marker-info">
                        <div className="marker-info-city">
                            { this.props.text }
                        </div>
                        <div className="marker-info-value">
                            Temperature Actuelle : 4.5°
                        </div>
                        <div className="marker-info-value">

                        </div>
                    </div>
                </div>
            </a>
        );
    }
}
