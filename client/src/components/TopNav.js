import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative"
    },
    toolBar: {
      justifyContent: "space-between",
      height: "68px"
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      color: "#BEAC46"
    }
  }));

export default function TopNav(props) {

    const classes = useStyles();

    let { id } = useParams();

    return (
        <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" component="h2" className={classes.title}>
              CalCent
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    )
}