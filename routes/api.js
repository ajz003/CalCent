var express = require('express')
var router = express.Router()

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db')

// User
router.get('/users/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE user_id = $1', [req.params.id], (err, response) => {
    if (err) {
      return next(err)
    }
    if (response.rows[0] === undefined) {
      res.send('undefined')
    }
    console.log(response.rows[0])
    res.send(response.rows[0])
  })
})

router.get('/users', (req, res, next) => {
  db.query('SELECT * FROM users', (err, response) => {
    if (err) {
      return next(err)
    }
    res.send(response.rows)
  })
})

router.post('/users', (req, res, next) => {
  let user = {
    username: req.body.user.username,
    password: req.body.user.password,
    email: req.body.user.email
  }
  db.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [user.username, user.password, user.email], (err, response) => {
    if (err) {
      return next(err)
    }
    res.send(req.body);
  })
})
// ... many other routes in this file

module.exports = router