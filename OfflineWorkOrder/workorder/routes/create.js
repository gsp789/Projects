var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	console.log('Work Order Details: \n' + req.body.wo);
	res.render('index', { message: 'Work Order saved successfully' });
});

module.exports = router;
