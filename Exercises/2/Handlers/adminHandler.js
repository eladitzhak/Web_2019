const data = require('../data');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const moment = require('moment');

const getAllLogs = (req, res, bearerToken) => {
	if (bearerToken) {
		console.log('verifying token and autorization');
		const logObj = { ACTION: 'getAllLogs', date: moment().format() };
		data.logs.push(logObj);
		const result = checkUserAutorization(bearerToken);
		if (result === true) {
			res.writeHeader(200);
			res.end(JSON.stringify(data.logs));
		} else {
			res.writeHeader(403);
			res.end(result);
		}
	} else {
		res.writeHeader(403);
		res.end('JWT Token is not valid');
	}
};

const numberofticketsleft = (req, res, bearerToken) => {
	if (bearerToken) {
		console.log('verifying token and autorization');
		const result = checkUserAutorization(bearerToken);
		if (result === true) {
			console.log('sending # tickets left');
			res.writeHeader(200);
			const msg = 'number of tickets left: ' + data.totalTickets;
			res.end(msg);
			const logObj = { ACTION: 'numberofticketsleft', date: moment().format(), data: msg };
			data.logs.push(logObj);
		} else {
			res.writeHeader(403);
			res.end(result);
			const logObj = { ACTION: 'numberofticketsleft', date: moment().format(), data: result };
			data.logs.push(logObj);
		}
	} else {
		res.writeHeader(403);
		res.end('JWT Token is not valid');
	}
};

// this fucction verify that JWT token is valid return error msg for errors, returns the token decoded for success.
const verifyJWT = function (bearerToken) {
	const token = bearerToken.slice(7, bearerToken.length);
	console.log(`after slicing token ${token}`);

	const result = jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			console.log('Token is not valid');
			return false;
		} else {
			console.log('token valid,checking..');
			console.log(decoded);
			// return (JSON.stringify(decoded));
			return (decoded);
		}
	});
	return result;
};
// this function uses the verifyJWT above and checks if the data "role":"admin" exists in decoded JWT. returns true or error msg
const checkUserAutorization = function (bearerToken) {
	const tokenDecoder = verifyJWT(bearerToken);
	if (tokenDecoder !== false) {
		console.log('got ' + JSON.stringify(tokenDecoder));
		// eslint-disable-next-line dot-notation
		const user = tokenDecoder['role'];
		if (user === 'admin') {
			return true;
		} else {
			const msg = 'user not authorized !';
			return msg;
		}
	} else {
		const msg = 'cannot validate JWT token';
		return msg;
	}
};

const getAllOrders = (req, res, bearerToken) => {
	if (bearerToken) {
		console.log('verifying token and autorization');
		const result = checkUserAutorization(bearerToken);
		if (result === true) {
			console.log('sending all orders');
			res.writeHeader(200);
			res.end(JSON.stringify(data.orders));
			const logObj = { ACTION: 'getAllOrders', date: moment().format(), data: 'Success' };
			data.logs.push(logObj);
		} else {
			res.writeHeader(403);
			res.end(result);
			const logObj = { ACTION: 'getAllOrders', date: moment().format(), data: 'result' };
			data.logs.push(logObj);
		}
	} else {
		res.writeHeader(403);
		const msg = 'JWT Token is missing';
		res.end(msg);
		const logObj = { ACTION: 'getAllOrders', date: moment().format(), data: msg };
		data.logs.push(logObj);
	}
};

const deleteAllOrders = (req, res, bearerToken) => {
	if (bearerToken) {
		console.log('verifying token and autorization');
		const result = checkUserAutorization(bearerToken);
		if (result === true) {
			console.log('delete all orders');
			data.orders = [];
			data.totalTickets = 10;
			const logObj = { ACTION: 'deleteAllOrders', date: moment().format(), data: 'Success' };
			data.logs.push(logObj);
			res.writeHeader(200);
			res.end('Successfully delete all orders');
		} else {
			const logObj = { ACTION: 'deleteAllOrders', date: moment().format(), data: result };
			data.logs.push(logObj);
			res.writeHeader(403);
			res.end(result);
		}
	} else {
		const msg = 'JWT Token is missing';
		const logObj = { ACTION: 'deleteAllOrders', date: moment().format(), data: msg };
		data.logs.push(logObj);
		res.writeHeader(403);
		res.end(msg);
	}
};

module.exports = {
	deleteAllOrders,
	getAllOrders,
	numberofticketsleft,
	getAllLogs
};
