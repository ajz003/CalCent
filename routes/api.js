var express = require('express')
var router = express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        let user = {
          username: req.body.user.username,
          password: hash,
          email: req.body.user.email
        }
        db.query("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", [user.username, user.password, user.email], (err, response) => {
          if (err) {
            return next(err)
          }
          res.send(req.body);
        })
    });
});

})
// ... many other routes in this file


router.get('/login', (req, res, next) => {
  if (req.session) {
    console.log(req.session)
    res.send(req.session.username)
  } else {
    res.send(false)
  }
})

router.post('/login', (req, res, next) => {

          let user = {
            username: req.body.user.username,
            password: req.body.user.password
          }
          db.query("SELECT password FROM users WHERE username = $1", [user.username], (err, response) => {
            if (err) {
              return next(err)
            }
            if (response.rows[0]) {
              let hash = response.rows[0].password
              bcrypt.compare(req.body.user.password, hash, function(err, result) {
                if (result) {
                  req.session.loggedin = true;
                  req.session.username = user.username;
                  console.log(req.session, 'REQ.SESSIONS')
                  req.session.save(function(err) {
                    // session saved
                    res.sendStatus(200)
                  })
                  
                } else {
                  res.send(false)
                }
              });              
            } else {
              res.send(false)
            }

          })
})

router.post('/logout', (req, res, next) => {

  if (req.session.loggedin) {
    req.session.destroy()
    res.sendStatus(200)
    
  } else {
    res.send(false)
  }
})


module.exports = router