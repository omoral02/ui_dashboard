var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('./build.html');
=======
  res.render('index', { title: ' Gator | Home ' });
>>>>>>> 70fbacedce9301cfb920720e666c5be9eed42342
});

module.exports = router;
