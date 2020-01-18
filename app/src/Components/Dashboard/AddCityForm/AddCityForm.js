import * as React from "react";
import cookie from "react-cookies";

export class AddCityForm extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            city: ''
        };

        this.addCity = this.addCity.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    addCity(event) {
        event.preventDefault();

        if (this.state.city) {
            fetch('http://localhost:3000/city/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookie.load('token')
                    },
                    body: JSON.stringify({
                        name: this.state.city,
                        user: cookie.load('user')
                    }),
                })
                .then(res => res.json())
                .then(() =>  window.location.reload())

                .catch( error => console.error('Error', error) );
        }
    }

    changeCity(event) {
        event.preventDefault();
        this.setState({ city: event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addCity}>
                    <input type="text" value={ this.state.city } onChange={ this.changeCity } placeholder="Enter a city name" />
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}
