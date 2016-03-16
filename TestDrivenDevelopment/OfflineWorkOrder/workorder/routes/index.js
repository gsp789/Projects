var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: '' });
});

router.post('/', function(req, res, next) {
	console.log('In Index.js\n');
	res.redirect('/');
});


module.exports = router;
