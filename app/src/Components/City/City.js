import * as React from "react";
import cookie from "react-cookies";

export class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: [],
            temperature: [],
            wind: []
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
        return (
            <div>

                <h1 className="page-title"> { this.state.weather.city } </h1>
                Weather : { this.state.weather.status } <br/>
                Description : { this.state.weather.description } <br/>
                Humidity : { this.state.weather.humidity } <br/>
                Temperature :
                <ul>
                    <li> Current : { this.state.temperature.current } </li>
                    <li> Min : { this.state.temperature.min } </li>
                    <li> Max : { this.state.temperature.max } </li>
                    <li> Feels Like : { this.state.temperature.feels_like } </li>
                </ul>
                Wind :
                <ul>
                    <li> Speed : { this.state.wind.speed } </li>
                    <li> Direction : { this.state.wind.direction } </li>
                </ul>

                <button onClick={this.deleteCity}> Delete </button>
            </div>
        );
    }
}
