var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
  // fs.readFile('../views/index.html', function(err, data) {
  //   console.log(data);

  // });
});

module.exports = router;
