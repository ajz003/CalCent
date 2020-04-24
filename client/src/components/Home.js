import React, { useState, useEffect } from "react";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import LanguageIcon from '@material-ui/icons/Language';

const axios = require('axios');

function Home() {

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
        <h2>Home</h2>

    )
}

export default Home