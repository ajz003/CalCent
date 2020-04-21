import React from "react";

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const axios = require('axios');

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            email: null,
            password: null
        };
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (event) => {
        //Make a network call somewhere
        event.preventDefault();
        this.setState({
            theValue: this.state.id
        })

        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        axios.post('/api/users', {
            user
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleLoginSubmit = (event) => {
        //Make a network call somewhere
        event.preventDefault();
        this.setState({
            theValue: this.state.id
        })

        let user = {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        }
        axios.post('/api/users/login', {
            user
        })
            .then((response) => {
                console.log(response);
                if (response.data) {
                    this.setState({
                        status: "Logged in"
                    })
                } else {
                    this.setState({
                        status: "Not logged in"
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.handleLoginSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="login-username">login-username</InputLabel>
                        <Input type="text" id="loginUsername" aria-describedby="login-username-helper-text" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="login-password">login-Password</InputLabel>
                        <Input type="login-password" id="loginPassword" aria-describedby="login-password-helper-text" onChange={this.handleChange} />
                    </FormControl>
                    <Button color="primary" type="submit" label="Submit">
                        Submit
    </Button>
                    <p>{this.state.theValue}</p>
                    <p>{this.state.theResult}</p>
                </form>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input type="text" id="username" aria-describedby="username-helper-text" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type="password" id="password" aria-describedby="password-helper-text" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="email">Email address</InputLabel>
                        <Input type="email" id="email" aria-describedby="email-helper-text" onChange={this.handleChange} />
                        <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <Button color="primary" type="submit" label="Submit">
                        Submit
    </Button>
                    <p>{this.state.theValue}</p>
                    <p>{this.state.theResult}</p>
                </form>
                <h3>{this.state.status}</h3>
            </>
        )
    }
}