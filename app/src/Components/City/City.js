import * as React from "react";
import cookie from "react-cookies";

export class City extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: [],
            temperature: [],
            wind: []
        }
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

    render() {
        return (
            <div>
                <h2> { this.state.weather.city } </h2>
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


            </div>
        );
    }
}