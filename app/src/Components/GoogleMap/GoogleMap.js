import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from "./Marker/Marker";
import cookie from "react-cookies";
import './styles/GoogleMap.css';

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
    };

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
            .then(res => res.json())
            .then(data => {
                this.setState({ cities: data.cities });
            });
    }

    render() {
        return (
            <div>
                <div className="google-map"  style={{ height: '600px', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDwSg_hOYaK6Gl-9FLSMIDUeb6cb9vXrGg' }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    >
                        { this.state.cities.map(city =>
                            <Marker key={city.city}
                                    lat={city.coords.lat}
                                    lng={ city.coords.lon }
                                    text={ city.city }
                                    temperature={ city.temperature }
                                    weather= { city.status }
                            />
                        )}
                    </GoogleMapReact>

                </div>
            </div>

        );
    }
}

export default Map;
