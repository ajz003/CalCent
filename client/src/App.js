import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from "./components/Home"
import TopNav from "./components/TopNav"
import BottomNav from "./components/BottomNav"

import Button from '@material-ui/core/Button';

import Login from "./components/Login"

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

const routes = [
  {
    path: "/",
    exact: true,
    topnav: () => <TopNav heading="Home" />,
    main: () => <h2>Home main</h2>
  },
  {
    path: "/login",
    topnav: () => <TopNav heading="Login" />,
    main: () => <h2>login</h2>
  },
  {
    path: "/my-list",
    topnav: () => <TopNav heading="My List" />,
    main: () => <h2>My List</h2>
  }
];

export default function App() {

  const classes = useStyles();

  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState("false");

  async function fetchLogin() {
    const res = await axios.get(`/api/login`)
    const data = await res
    console.log(data)
    setUsername(data.data)
    if (data.data) {
      setLoggedIn("true")      
    }

  }

  async function logout() {
    const res = await axios.post(`/api/logout`)
    const data = await res
    console.log(data)
  }

  useEffect(() => {
    fetchLogin()
  }, [])

  return (
    <Router>
      <div className={classes.root}>
        
        <Switch>
            {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.topnav />}
              />
            ))}
          </Switch>
          <p>{loggedIn}</p>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/my-list">My List</Link>
            </li>
          </ul>


          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/my-list">
            <Home />
          </Route>
        </Switch>


          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>


          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
          <BottomNav />
          </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}