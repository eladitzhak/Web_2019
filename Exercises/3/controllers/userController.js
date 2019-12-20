const mongoose = require('mongoose');
const User = require('../User');
const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
	console.log('Someone entered to usercontroller in time: ', Date.now());
	next();
});

router.get('/getAllUsers', function (req, res) {
	console.log('1');
	User.find({}, (err, result) => {
		if (err) {
			console.log('*****error!******', err);
		}
		console.log('userData');
		console.log('\x1b[33m%s\x1b[0m', 'user in controller'); // yello
		console.log(result);
		res.json(result);
	});
});

// router.get('/getUserById', function (req,re))

router.get('/how-to-use', function (req, res) {
	res.send('How to use');
});

module.exports = router;
