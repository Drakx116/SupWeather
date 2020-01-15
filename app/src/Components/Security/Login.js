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
                }
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

                <div id="auth-form">
                    <div className="login-card">
                        <div className="card-title">
                            <h1 className="page-title"> Sign In </h1>
                        </div>

                        <div className="content" >
                            <form method="POST" onSubmit={this.submitForm}>
                                <input id="pseudo" type="text" placeholder="Pseudo" required
                                       autoFocus value={this.state.pseudo} onChange={this.changePseudo} />

                                <input id="password" type="password"
                                       placeholder="Password" value={this.state.password} onChange={this.changePassword} required />

                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
