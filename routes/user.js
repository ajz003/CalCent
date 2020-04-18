var express = require('express')
var router = express.Router()

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db')
router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM emp_data WHERE id = $1', [req.params.id], (err, response) => {
    if (err) {
      return next(err)
    }
    console.log(response.rows[0])
    res.send(response.rows[0])
  })
})
// ... many other routes in this file

module.exports = router