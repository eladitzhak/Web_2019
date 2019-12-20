const handler = require('../handler');
const data = require('../data');
const moment = require('moment');
const removeFromData = function (indexVal) {
	console.log(`index to remove from data is ${indexVal}`);
	console.log(JSON.stringify(data.orders));
	data.orders.splice(indexVal, 1);
	console.log(`data after remove index ${indexVal}  ${JSON.stringify(data.orders)} `);
};

const deleteOrder = (req, res, orderID) => {
	const orderIDIndex = handler.findIndex(orderID);
	if (orderIDIndex != -1) {
		removeFromData(orderIDIndex);
		res.writeHeader(200);
		const msg = `Success - Order with ID ${orderID} removed `;
		res.end(msg);
		const logObj = { ACTION: 'deleteOrder', date: moment().format(), data: msg };
		data.logs.push(logObj);
	} else {
		const msg =`Error! cannot find order ${orderID} in order list `;
		res.writeHeader(400);
		res.end(msg);
		const logObj = { ACTION: 'deleteOrder', date: moment().format(), data: msg };
		data.logs.push(logObj);
	}
};

module.exports = {
	deleteOrder
}