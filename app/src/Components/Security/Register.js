import * as React from "react";
import {registerAndRedirect} from "../../API/register";

export class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: '',
            password: '',
            confirmPassword: '',
            invalidForm: ''
        };

        this.changePseudo = this.changePseudo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {
        event.preventDefault();

        const pseudo = this.state.pseudo;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        let error = false;

        if(!(pseudo && password && confirmPassword)) {
            this.setState({ invalidForm: 'Empty fields.' });
            error = true;
        }

        if(!error && pseudo.length < 4) {
            this.setState({ invalidForm : 'Pseudo is too short. Min : 4 characters.' });
            error = true;
        }

        if(!error && password.length < 6) {
            this.setState({ invalidForm : 'Password is too short. Min : 6 characters.' });
            error = true;
        }

        if( !error && password !== confirmPassword) {
            this.setState({ invalidForm: 'Passwords are different.' });
            error = true;
        }

        if(!error) {
            registerAndRedirect(
                {
                    pseudo: pseudo,
                    password: password
                }
            );
        }
    }

    changePseudo(event) {
        event.preventDefault();
        this.setState({ pseudo: event.target.value });
    }

    changePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    changeConfirmPassword(event) {
        event.preventDefault();
        this.setState({ confirmPassword: event.target.value });
    }

    render() {
        return(
            <div className="component-container">

                <div id="auth-form">
                    <div className="login-card">
                        <div className="card-title">
                            <h1 className="page-title"> Sign Up </h1>
                        </div>

                        <div className="content" >
                            <form method="POST" onSubmit={this.submitForm}>
                                <input id="pseudo" type="text"  placeholder="Pseudo" required
                                       autoFocus value={this.state.pseudo} onChange={this.changePseudo} />

                                <input id="password" type="password"
                                       placeholder="Password" value={this.state.password} onChange={this.changePassword} required />

                                <input id="password" type="password"
                                       placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} required />

                                <button type="submit" className="btn btn-primary"> Register </button>
                            </form>


                            <div className="error-box"> { this.state.invalidForm } </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}