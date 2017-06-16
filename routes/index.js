var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    name: 'essential-platform-back',
    version: 'v0.0.1'
  });
});

module.exports = router;
