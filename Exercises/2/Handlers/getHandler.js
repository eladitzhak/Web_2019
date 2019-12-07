const data = require('../data');
const handler = require('../handler');
const moment = require('moment');
exports.getSingleData = (req, res) => {
	const { id } = req.urlObject.query; // destractor
	console.log(`/getSingleData? ${id} called!`);
	if (id && !Number.isNaN(id)) {
		console.log(`user id requested is ${id}`);
		const orderIDIndex = handler.findIndex(id);
		console.log(`orderIDIndex is ${orderIDIndex}`);
		if (orderIDIndex !== -1) {
			res.writeHeader(200);
			res.end(JSON.stringify(data.orders[orderIDIndex].getAllInfo()));
			const logObj = { ACTION: 'getSingleData', date: moment().format(), data: 'SUCCESS' };
			data.logs.push(logObj);
		} else {
			const msg = (`id # ${id} does not exists!`);
			console.log(msg);
			res.writeHeader(404);
			res.write(msg);
			res.end();
			const logObj = { ACTION: 'getSingleData', date: moment().format(), data: msg };
			data.logs.push(logObj);
		}
	} else {
		const msg = 'Order ID must be integer ant cannot be null';
		console.log(msg);
		res.writeHeader(400);
		res.write(msg);
		res.end();
		const logObj = { ACTION: 'getSingleData', date: moment().format(), data: msg };
		data.logs.push(logObj);
	}
};
