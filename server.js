const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var pg = require('pg')
  , pgSession = require('connect-pg-simple')(session);

const app = express();
const port = process.env.PORT || 5000;

const db = require('./db')

var sess = {
  store: new pgSession({
    conString: process.env.DATABASE_URL
  }),
  secret: 'secret',
  proxy: true,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
  // 30 days
}


if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
 
app.use(session(sess));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


var api = require('./routes/api')

app.use('/api', api)

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});