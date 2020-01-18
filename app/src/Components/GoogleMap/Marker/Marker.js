import React from "react";

import './styles/Marker.css';

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
                            Current temperature : { this.props.temperature }°
                        </div>
                        <div className="marker-info-value">
                            Weather : { this.props.weather }
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}
