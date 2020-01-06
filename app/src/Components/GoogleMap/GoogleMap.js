import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from "./Marker/Marker";
import cookie from "react-cookies";

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Paris
            center: {
                lat: 48.8534,
                lng: 2.3488
            },
            zoom: 5,
            cities: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/weather/city/list`,
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookie.load('token'),
                'User': cookie.load('user')
            }
        })
            .then(res => {
                console.log(res);
            })
    }

    render() {
        return (
            <div style={{ height: '600px', width: '800px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDwSg_hOYaK6Gl-9FLSMIDUeb6cb9vXrGg' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <Marker
                        lat={48.955413}
                        lng={2.337844}
                        text="Marker"
                    />
                </GoogleMapReact>

                {/*<ul>*/}
                {/*    { this.state.cities.map(city => <li>{city.name}</li>)}*/}
                {/*</ul>*/}
            </div>
        );
    }
}

export default Map;