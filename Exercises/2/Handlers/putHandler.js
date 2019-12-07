
const data = require('../data');
const handler = require('../handler');
const moment = require('moment');

const updateTicketsAmount = function (currentOrderTicketAmount, newTicketsAmount, orderIDIndex) {
	if (newTicketsAmount > currentOrderTicketAmount) {
		if (data.totalTickets - (newTicketsAmount - currentOrderTicketAmount) >= 0) {
			console.log(`currnet total tickets ${data.totalTickets} new tickets amount ${newTicketsAmount} current order ticekts : ${currentOrderTicketAmount}`);
			data.orders[orderIDIndex].setNumberOfTickets(newTicketsAmount);
			data.totalTickets -= (newTicketsAmount - currentOrderTicketAmount);
			console.log(`new total number of tickets ${data.totalTickets}`);
			return true;
		} else {
			const msg = 'not enough tickets to complete request';
			console.log(msg);
			return msg;
		}
	} else if (newTicketsAmount < currentOrderTicketAmount) { // user returning tickets
		if (data.totalTickets + (currentOrderTicketAmount - newTicketsAmount) <= 10) {
			data.orders[orderIDIndex].setNumberOfTickets(newTicketsAmount);
			data.totalTickets += (currentOrderTicketAmount - newTicketsAmount);
			console.log(`new total number of tickets ${data.totalTickets}`);
			return true;
		} else {
			const msg = 'too many tickets provided to complete requerst';
			console.log(msg);
			return msg;
		}
	} else {
		const msg = `current order num of tickets - ${currentOrderTicketAmount} and new amount - ${newTicketsAmount} are the same`;
		return msg;
	}
};

// const findIndex = function (IDVal) {
// 	console.log(`looking for id ${IDVal}`);
// 	let index = -1;
// 	data.orders.findIndex(function (item, i) {
// 		if (item.id === IDVal) {
// 			index = i;
// 			console.log(`found i in index ${i} return..`);
// 			return i;
// 		}
// 		if (index === -1) {
// 			console.log(`cannot find ID ${IDVal} in data `);
// 		}
// 	});
// 	return index;
// };

exports.changeTicketsAmount = (req, res, orderID) => {
	console.log(`orderID is ${orderID}`);
	let newTicketsAmount;
	req.on('data', (dataReceived) => {
		const dataItem = JSON.parse(dataReceived);
		newTicketsAmount = dataItem.newTicketsAmount;
		const orderIDIndex = handler.findIndex(orderID);
		if (!Number.isNaN(newTicketsAmount) && orderIDIndex !== -1) {
			const currentOrderTicketAmount = data.orders[orderIDIndex].getOrderTickets();
			const updateResult = updateTicketsAmount(currentOrderTicketAmount, newTicketsAmount, orderIDIndex);
			console.log(`update ticekts returned with ${updateResult}`);
			if (updateResult !== true) {
				const logObj = { ACTION: 'changeTicketsAmount', date: moment().format(), data: updateResult };
				data.logs.push(logObj);
				res.writeHeader(400);
				res.end(updateResult);
			} else {
				const logObj = { ACTION: 'changeTicketsAmount', date: moment().format(), data: 'SUCCESS' };
				data.logs.push(logObj);
				res.writeHeader(200);
				res.end('Tickets amount updated successfully');
			}
		} else {
			const msg = `new value for tickets must be number and orderid must exist in system. you provided tickets amount ${newTicketsAmount} and order ID ${orderID}`;
			res.writeHeader(400);
			res.end(msg);
			const logObj = { ACTION: 'changeTicketsAmount', date: moment().format(), data: 'FAIL' };
			data.logs.push(logObj);
		}
	});
};

exports.changeName = (req, res, orderID) => {
	console.log(`orderID is ${orderID}`);
	let newName;
	req.on('data', (dataReceived) => {
		const dataItem = JSON.parse(dataReceived);
		newName = dataItem.newName;
		const orderIDIndex = handler.findIndex(orderID);
		if (typeof newName !== 'string' || orderIDIndex === -1 || newName === '') {
			const msg = `value must be a string and Order ID must be in system got ${newName} and ${orderID} `;
			console.log(msg);
			res.writeHeader(400);
			res.end(msg);
		} else {
			data.orders[orderIDIndex].setName(newName);
			res.writeHeader(200);
			res.end('order owner name updated successfully');
		}
	});
};
