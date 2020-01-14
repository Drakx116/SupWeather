import React from "react";
import { withRouter } from 'react-router-dom';
import cookie from "react-cookies";

import './styles/auth.css';

import { authAndRedirect } from "../../API/login";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pseudo: '',
            password: '',
            invalidForm: ''
        };

        this.changePseudo = this.changePseudo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // Input handlers
    changePseudo(event) {
        event.preventDefault();
        this.setState({ pseudo: event.target.value });
    }

    changePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    // Form and API call
    submitForm(event)  {
        // Avoids page refreshment
        event.preventDefault();

        if(this.state.pseudo && this.state.password) {
            this.setState({ invalidForm: '' });

            authAndRedirect(
                {
                    pseudo: this.state.pseudo,
                    password: this.state.password,
                },
                this.props
            );
        }
        else {
            this.setState({ invalidForm: 'Empty fields.' });
        }
    }

    render() {
        // Next redirect to /profile
        if(cookie.load('token')) {
            this.props.history.push('/');
        }

        return (
            <div className="component-container">
                <h1 className="page-title"> Welcome back ! </h1>

                <form onSubmit={this.submitForm}>
                    <label className="auth-label">
                        Pseudo :  <br />
                        <input className="auth-input" type="text" value={this.state.pseudo} onChange={this.changePseudo} />
                    </label>

                    <label className="auth-label">
                        Mot de passe :  <br />
                        <input className="auth-input" type="password" value={this.state.password} onChange={this.changePassword} />
                    </label>

                    <input className="auth-submit" type="submit" value="Envoyer" />
                </form>


                <div className="error-box"> { this.state.invalidForm } </div>
            </div>
        );
    }
}

export default withRouter(Login);
