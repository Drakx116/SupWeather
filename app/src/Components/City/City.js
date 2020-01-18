import * as React from "react";
import cookie from "react-cookies";
import './styles/City.css';
import Thermometer from "react-thermometer-component";

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


    render() {
        return <div>
            <h1 className="city-name"> {this.state.weather.city} </h1>
            <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt={this.state.weather.status}/>

            <div className="weather-item"> Weather : {this.state.weather.status} </div>
            <div className="weather-item"> Description : {this.state.weather.description} </div>

            <div className="weather-item"> Humidity : {this.state.weather.humidity} </div>

            <div className="weather-item">
                Temperature
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

            <div className="weather-item">
                Wind :
                <ul>
                    <li> Speed : {this.state.wind.speed} </li>
                    <li> Direction : {this.state.wind.direction} </li>
                </ul>
            </div>

            <div className="weather-item">
                <button onClick={this.deleteCity}> Delete</button>
            </div>
        </div>;
    }
}
