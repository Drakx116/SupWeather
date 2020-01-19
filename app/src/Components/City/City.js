import * as React from "react";
import cookie from "react-cookies";
import './styles/City.css';
import Thermometer from "react-thermometer-component";
import Gauge from 'react-radial-gauge';
import ReactAnimatedWeather from 'react-animated-weather';

export class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: [],
            temperature: [],
            wind: [],
            icon: ''
        };

        this.deleteCity = this.deleteCity.bind(this);
    }

    componentDidMount () {
        const { city } = this.props.match.params;

        fetch(`http://localhost:3000/weather/city/${city}`,
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookie.load('token'),
                'User': cookie.load('user')
            }
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({ weather: data.weather });
                this.setState({ temperature: data.weather.temperature });
                this.setState({ wind: data.weather.wind });
                this.setState({ icon: data.weather.icon });
            });
    }

    deleteCity(event) {
        event.preventDefault();

        const { city } = this.props.match.params;
        const parts = city.split(' ');

        let cityName = "";
        if(parts[0] === "arrondissement" && parts[1] === "de") {
            for (let i = 2; i < parts.length; i++) {
                cityName += parts[i] + " ";
            }
        }

        if(!cityName) {
            cityName = city
        }

        fetch('http://localhost:3000/city/delete', {
            method: 'POST',
            headers: {
                "Authorization": cookie.load('token'),
                user: cookie.load('user'),
                name: cityName
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    this.props.history.push('/');
                }
            });
    }

    ucwords(string) {
        return (string + '').replace(/^(.)|\s+(.)/g, ($1) => {
            return $1.toUpperCase()
        });
    }

    getAnimatedIconName() {
        const weatherAnimatedIcons = {
            "01d": 'CLEAR_DAY',
            "01n": 'CLEAR_NIGHT',
            "02d": 'PARTLY_CLOUDY_DAY',
            "02n": 'PARTLY_CLOUDY_NIGHT',
            "03d": 'CLOUDY',
            "03n": 'CLOUDY',
            "04d": 'PARTLY_CLOUDY_DAY',
            "04n": 'PARTLY_CLOUDY_NIGHT',
            "09d": 'RAIN',
            "09n": 'RAIN',
            "10d": 'RAIN',
            "10n": 'RAIN',
            "11d": 'WIND',
            "13d": 'SNOW',
            "50d": 'FOG'
        };
        return weatherAnimatedIcons[this.state.icon];
    }

    getAnimatedIconColor() {
        const weatherAnimatedColors = {
            "01d": '#ffdc00',
            "01n": '#ebc900',
            "02d": '#ffdc00',
            "02n": '#ebc900',
            "03d": '#cccccc',
            "03n": '#dddddd',
            "04d": '#ebc900',
            "04n": '#dddddd',
            "09d": '#666666',
            "09n": '#666666',
            "10d": '#666666',
            "10n": '#666666',
            "11d": '#5e993d',
            "13d": '#cfcfcf',
            "50d": '#bbbbbb'
        };
        return weatherAnimatedColors[this.state.icon];
    }

    getWindDirection()
    {
        let stringDirection = null;

        const windDirection = parseInt(this.state.wind.direction);
        if(windDirection)
        {
            const directions = {
                "0": "N-NE",
                "45": "E-NE",
                "90": "E-SE",
                "135": "S-SE",
                "180": "S-SW",
                "225": "W-SW",
                "270": "W-NW",
                "315": "N-NW",
            };

            for (let degrees = 0; degrees < 360; degrees += 45) {
                if(windDirection <= degrees) {
                    if(!(stringDirection)) {
                        const currentDegreesInterval = (degrees - 45).toString();
                        stringDirection = directions[currentDegreesInterval];
                    }
                }
            }

            return stringDirection ?? "N-NE";
        }
    }

    render() {
        return <div>
            <h1 className="city-name">
                Today, {this.state.weather.city}
            </h1>
            <div className="city-delete-form">
                <button className="button is-danger" onClick={this.deleteCity}> Delete </button>
            </div>

            <div className="humidity">
                <div className="humidity-gauge">
                    <div className="humidity-label"> Humidity </div>
                    <Gauge
                        size="175"
                        currentValue={ this.state.weather.humidity }
                        dialWidth={10}
                        dialColor="#ECF0F1"
                        progressWidth={6}
                        progressColor="#3498DB"
                        tickLength={6}
                        tickWidth={2}
                        tickColor="#3498DB"
                        needleColor="#f44336"
                        needleBaseSize={5}
                        needleBaseColor="#f02412"
                        needleWidth={5}
                        needleSharp={true}
                    />
                </div>

                <div className="humidity-gauge">
                    <div className="humidity-label"> Actual : { this.ucwords(this.state.weather.description) } </div>
                    <div className="weather-item">
                        <ReactAnimatedWeather
                            icon={ this.getAnimatedIconName() }
                            color={ this.getAnimatedIconColor()}
                            size={ 175 }
                            animate={ true }
                        />
                    </div>
                </div>

                <div className="humidity-gauge">
                    <div className="humidity-label"> { this.getWindDirection() } - {this.state.wind.speed } km/h </div>
                    <ReactAnimatedWeather
                        icon="WIND"
                        color="#5e993d"
                        size={ 175 }
                        animate={ true }
                    />

                </div>
            </div>

            <div className="thermometers">
                <div className="thermometer-item">
                    <div className="thermometer-label"> Current </div>
                    <Thermometer
                        theme="light"
                        value={ this.state.temperature.current }
                        max="50"
                        format="°C"
                        size="medium"
                        height="150"
                    />
                </div>
                <div className="thermometer-item">
                    <div className="thermometer-label"> Feels Like </div>
                    <Thermometer
                        theme="light"
                        value={ this.state.temperature.feels_like }
                        max="50"
                        format="°C"
                        size="medium"
                        height="150"
                    />
                </div>
                <div className="thermometer-item">
                    <div className="thermometer-label"> Minimum </div>
                    <Thermometer
                        theme="light"
                        value={ this.state.temperature.min }
                        max="50"
                        format="°C"
                        size="medium"
                        height="150"
                    />
                </div>
                <div className="thermometer-item">
                    <div className="thermometer-label"> Maximum </div>
                    <Thermometer
                        theme="light"
                        value={ this.state.temperature.max }
                        max="50"
                        format="°C"
                        size="medium"
                        height="150"
                    />
                </div>
            </div>
        </div>;
    }
}
