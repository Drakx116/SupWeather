import * as React from "react";
import cookie from "react-cookies";
import './styles/AddCityForm.css';

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
                <form onSubmit={this.addCity} className="control" id="dashboard-form">
                    <div className="field has-addons">
                        <div className="control">
                            <input id="city-name" className="input" type="text" value={ this.state.city } onChange={ this.changeCity } placeholder="Enter a city name ..." />
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-info" id="submit-button" value="Add" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
