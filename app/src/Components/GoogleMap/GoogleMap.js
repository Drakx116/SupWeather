import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Marker.css';

const AnyReactComponent = ({ text }) => <div className='google-maps-marker'> <div className="marker-text"> {text} </div> </div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 48.8534,
            lng: 2.3488
        },
        zoom: 5
    };

    render() {
        return (
            <div style={{ height: '600px', width: '800px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDwSg_hOYaK6Gl-9FLSMIDUeb6cb9vXrGg' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;