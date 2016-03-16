var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next){
	for(var prop in res.body)
		console.log(prop + " : " + res.body[prop] + ",  ");
	alert(res.body.name);
	res.render('/players', {name: res.body.name});
});

module.exports = router;