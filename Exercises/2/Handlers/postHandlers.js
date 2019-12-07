const Order = require('../Order');
const data = require('../data');
const moment = require('moment');

const insertNewData = (req, res) => {
	let body = '';
	// eslint-disable-next-line arrow-parens
	req.on('data', chunk => {
		body += chunk.toString();
	});
	req.on('end', () => {
		const newDataItem = JSON.parse(body);
		if (data.totalTickets - newDataItem.numOfTickets < 0) {
			const msg = `cannot create new order! not enough tickets to supply. requested ${newDataItem.numOfTickets} actual ${data.totalTickets}`;
			console.log(msg);
			res.writeHeader(400);
			res.end(msg);
		} else {
			const newOrder = new Order(newDataItem.first_name, newDataItem.last_name, newDataItem.numOfTickets)
				.on('orderChanged', () => console.log(`orderchnged: date: ${moment().format()} data: ${JSON.stringify(newOrder.getAllInfo())} `))
				.on('orderChanged', () => data.logs.push({ ACTION: 'orderchnged', date: moment().format(), data: newOrder.getAllInfo() }));
				// .on('orderCreated', () => data.logs.push({ ACTION: 'orderCreated', date: moment().format() }))
			data.totalTickets -= newDataItem.numOfTickets;
			data.orders.push(newOrder);
			data.logs.push({ ACTION: 'orderCreated', date: moment().format(), data: newOrder.getAllInfo() });
			// data.logs.push('OrderCreated', newOrder);
			// console.log('data pushed succesfuly');
			res.writeHeader(200);
			res.end('New order created succeffuly ' + newOrder.getAllInfo());
		}
	});
};

module.exports = {
	insertNewData
};
