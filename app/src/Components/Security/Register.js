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
                },
                this.props
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
                <h1 className="page-title"> Create a new account </h1>

                <form onSubmit={this.submitForm}>
                    <label className="auth-label">
                        Pseudo :  <br />
                        <input className="auth-input" type="text" value={this.state.pseudo} onChange={this.changePseudo} />
                    </label>

                    <label className="auth-label">
                        Password :  <br />
                        <input className="auth-input" type="password" value={this.state.password} onChange={this.changePassword} />
                    </label>


                    <label className="auth-label">
                        Confirm Password :  <br />
                        <input className="auth-input" type="password" value={this.state.confirmPassword} onChange={this.changeConfirmPassword} />
                    </label>

                    <input className="auth-submit" type="submit" value="Envoyer" />
                </form>
                <br/>
                <b> { this.state.invalidForm } </b>
            </div>
        );
    }
}