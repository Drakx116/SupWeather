import React from "react";

import './Marker.css';

export class Marker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: this.props.text
        }
    }

    render() {
        const url = `/city/` + this.state.label.toLowerCase();
        return (
            <a href={url}>
                <div className='google-maps-marker'>
                    <div className="marker-text">
                        { this.state.label }
                    </div>
                </div>
            </a>
        );
    }
}