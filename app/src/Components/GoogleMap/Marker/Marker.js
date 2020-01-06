import React from "react";

import '../Marker.css';

export class Marker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: this.props.text
        }
    }

    render() {
        return (
            <a href="">
                <div className='google-maps-marker'>
                    <div className="marker-text">
                        { this.state.label }
                    </div>
                </div>
            </a>
        );
    }
}