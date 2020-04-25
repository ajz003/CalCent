import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function Login() {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleLogin = (event) => {
        //Make a network call somewhere
        event.preventDefault();

        let user = {
            username: values.username,
            password: values.password
        }
        axios.post('/api/login', {
            user
        })
            .then((response) => {
                console.log(response);
                if (response.data) {
                    alert("Correct")
                    window.location.href = "/"

                } else {
                    alert("Incorrect")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={classes.root}>
            <div>
                <Typography component="h1" variant="h3">Login</Typography>
                <form>
                    <TextField
                        label="Username"
                        id="standard-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        onChange={handleChange('username')}
                    />
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleLogin}>Default</Button>
                </form>
            </div>
        </div>
    )

}

class Logins extends React.Component {
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
        axios.post('/api/login', {
            user
        })
            .then((response) => {
                console.log(response);
                if (response.data) {
                    this.setState({
                        status: "Logged in"
                    }, () => {
                        window.location.href = "/"
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