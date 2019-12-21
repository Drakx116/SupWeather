import React from "react";
import cookie from 'react-cookies';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pseudo: undefined,
            password: undefined,
            invalidForm: ''
        };

        this.changePseudo = this.changePseudo.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // Input handlers
    changePseudo(event) {
        this.setState({ pseudo: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    // Form and API call
    submitForm(event)  {
        // Avoids page refreshment
        event.preventDefault();

        if(this.state.pseudo && this.state.password)
        {
            let data = {
                pseudo: this.state.pseudo,
                password: this.state.password
            };

            fetch('http://localhost:3000/auth/login',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( res => {
                    cookie.save('token', res.data.token);
                } )

                .catch( error => console.error('Error', error) );
        }
        else {
            this.setState({ invalidForm: 'Empty fields.' });
        }
    }

    render() {
        return (
            <div className="component-container">
                <h2> Welcome back ! </h2>

                <form onSubmit={this.submitForm}>
                    <label>
                        Pseudo :  <br />
                        <input type="text" value={this.state.pseudo} onChange={this.changePseudo} />
                    </label>
                    <br/>

                    <label>
                        Mot de passe :  <br />
                        <input type="password" value={this.state.password} onChange={this.changePassword} />
                    </label>

                    <br /><br/>
                    <input type="submit" value="Envoyer" />
                </form>
                <br/>
                <b> { this.state.invalidForm } </b>
            </div>
        );
    }
}
