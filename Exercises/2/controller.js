const url = require('url');
// const { getSingleSong } = require('./handlers');

const deleteHandler = require('./Handlers/deletehandler');
const adminHandler = require('./Handlers/adminHandler');
const postHandler = require('./Handlers/postHandler');
const putHandler = require('./Handlers/putHandler');
const getHandler = require('./Handlers/getHandler');
module.exports = (req, res) => {
	console.log(`Request ${req.method} came from ${req.url}`);

	// eslint-disable-next-line node/no-deprecated-api
	const urlObject = url.parse(req.url, true, false);
	req.urlObject = urlObject;
	const orderID = req.urlObject.query.ID;
	switch (req.method) {
		case 'GET':
			if (urlObject.path === '/numberofticketsleft') {
				console.log('/numberofticketsleft called');
				const bearerToken = req.headers.authorization;
				adminHandler.numberofticketsleft(req, res, bearerToken);
			} else if (urlObject.pathname === '/getSingleData' && urlObject.query) {
				console.log('/getSingleData called!');
				getHandler.getSingleData(req, res);
			} else if (urlObject.path === '/getAllOrders') {
				console.log('/getAllOrders called!');
				const bearerToken = req.headers.authorization;
				adminHandler.getAllOrders(req, res, bearerToken);
			} else if (urlObject.pathname === '/getAllLogs') {
				console.log('/getAllLogs called!');
				const bearerToken = req.headers.authorization;
				adminHandler.getAllLogs(req, res, bearerToken);
			} else {
				console.log(`url ${urlObject.path} not exists!`);
				res.writeHeader(404);
				res.write('Page Not Found');
				res.end();
			}
			break;
		case 'POST':
			if (urlObject.pathname === '/insertNewData') {
				console.log('/insertNewData called!');
				postHandler.insertNewData(req, res);
			} else {
				console.log(`url ${urlObject.path} not exists!`);
				res.writeHeader(404);
				res.write('Page Not Found');
				res.end();
			}
			break;
		case 'PUT':
			console.log('PUT called');
			if (urlObject.pathname === '/changeTicketsAmount') {
				console.log('/changeTicketsAmount called');
				putHandler.changeTicketsAmount(req, res, orderID);
			} else if (urlObject.pathname === '/changeName') {
				console.log('/changeName called!');
				putHandler.changeName(req, res, orderID);
			} else {
				console.log(`url ${urlObject.path} not exists!`);
				res.writeHeader(404);
				res.write('Page Not Found');
				res.end();
			}
			break;
		case 'DELETE':
			console.log('DELETE called');
			if (urlObject.pathname === '/deleteOrder') {
				console.log('/DeleteOrder called');
				deleteHandler.deleteOrder(req, res, orderID);
			} else if (urlObject.pathname === '/deleteAllOrders') {
				console.log('/deleteAllOrders called!');
				const bearerToken = req.headers.authorization;
				adminHandler.deleteAllOrders(req, res, bearerToken);
			} else {
				console.log(`url ${urlObject.path} not exists!`);
				res.writeHeader(404);
				res.write('Page Not Found');
				res.end();
			}
			break;

		default:
			console.log('cannot find method requested!');
			console.log(`url ${urlObject.path} not exist!`);
			res.writeHeader(404);
			res.write('Bad request');
			res.end();
			break;
	}
};
