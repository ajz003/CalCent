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

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import LanguageIcon from '@material-ui/icons/Language';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
  }));

export default function BottomNav() {

    const classes = useStyles();

    const [username, setUsername] = useState();

    async function fetchData() {
        const res = await axios.get(`/api/login`)
        const data = await res
        console.log(data)
        setUsername(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <BottomNavigation
            value="Hello"
            position="fixed"
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            showLabels
        className={classes.stickToBottom}
        >

            <BottomNavigationAction component={Link} to={'/login'} label="Add Item" icon={<AddIcon />} />
            <BottomNavigationAction component={Link} to={'/'} label="My Items" icon={<ListIcon />} />
            <BottomNavigationAction component={Link} to={'/'} label="Community Items" icon={<LanguageIcon />} />
        </BottomNavigation>
        
    )
}