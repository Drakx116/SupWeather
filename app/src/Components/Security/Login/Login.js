import React from "react";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="component-container">
                <h2> Welcome back ! </h2>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pseudo :
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={"Pseudo"} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        );
    }
}