/* eslint-disable max-len */
/* eslint-disable no-tabs */

const http = require('http');
const url = require('url');
const port = 3031;
const data = require('../../data');
const controller = require('../../controller.js');

// const data = [{ id: 1, first_name: 'elad', last_name: 'itzhak', numOfTickets: 1 }, { id: 2, first_name: 'moshe', last_name: 'afya', numOfTickets: 1 }];

const logs = [];

const totalNumOfTIckets = 10;
// js file or json push to file

const Order = require('../../index.js');
// tickets ,array of orders 'array of logs
http.createServer((req, res) => {
	const urlObj = url.parse(req.url, true, false);

	switch (req.method) {
		case 'GET':
			// console.log(urlObj);
			if (urlObj.path === '/getTotalNumberOfTickets') {
				console.log('/getTotalNumberOfTickets called');
				if (totalNumOfTIckets) {
					res.writeHeader(200);
					res.write(`Total number of tickets is ${totalNumOfTIckets}`);
					res.end();
				} else {
					res.writeHeader(200);
					res.write('ERROR no tickets supplied!');
					res.end();
				}
			}
			if (urlObj.path === '/getAllData') {
				console.log('/getAllData  called!');
				res.writeHeader(200);
				res.end(JSON.stringify(data));
			} else if (urlObj.pathname === '/getSingleData' && urlObj.query) {
				const id = urlObj.query.id;
				console.log(`user id requested is ${id}`);
				if (!Number.isNaN(id) && data[id]) {
					console.log(`/getSingleData?${id} called!`);
					res.writeHeader(200);
					res.end(JSON.stringify(data[id]));
				} else {
					console.log(`#${id} not exists!`);
					res.writeHeader(404);
					res.write('Bad request');
					res.end();
				}
			} else {
				console.log(`url ${urlObj.path} not exists!`);
				res.writeHeader(404);
				res.write('Bad request');
				res.end();
			}
			break;
		case 'POST':
			if (urlObj.pathname === '/insertNewData') {
				console.log('/insertNewData called!');
				let body = '';
				// if (!(Order.getCount() <= 10)) {
				// 	console.log('10 ticket provdied');
				// }
				req.on('data', chunk => {
					body += chunk.toString(); // convert Buffer to string
					// body2.push(chunk);
					// console.log(body.last_name);
					// console.log('chunk is :' + chunk);
					// console.log(`new order is ${newOrder.id} ${newOrder.orderDate}`);
				});
				req.on('end', () => {
					const newDataItem = JSON.parse(body);
					console.log('first name is :' + newDataItem.first_name);
					console.log('last name is :' + newDataItem.last_name);
					console.log('tickets  is :' + newDataItem.numOfTickets);
					const newOrder = new Order(newDataItem.first_name, newDataItem.last_name, newDataItem.numOfTickets);
					console.log(`got new order: name: ${newOrder.fullName} /n orderID: ${newOrder.id} # tickets: ${newOrder.numOfTickets} with status ${newOrder.status} `);
					if (newOrder.status === 'OK') {
						data.orders.push(newOrder);
						console.log('data pushed succesfuly');
						res.writeHeader(200);
						res.end('ok');
					} else {
						console.log('error in order');
						res.writeHeader(202);
						res.write(`Bad request:  ${newOrder.status}`);
						res.end();
					}
				});
			} else {
				console.log(`url ${urlObj.path} not exist!`);
				res.writeHeader(404);
				res.write('Bad request');
				res.end();
			}
			break;
		case 'PUT':
			console.log('PUT called');
			if (urlObj.pathname === '/increaseTickets') {
				console.log('increaseTickets called');
				// console.log(urlObj);
				const resultID = urlObj.query.ID;
				let increaseValue;
				req.on('data', (dataReceived) => {
					const dataItem = JSON.parse(dataReceived);
					increaseValue = dataItem.increaseBY;
					//**if not null continue
					console.log(`need to update ID ${resultID} and increase ticekts by ${increaseValue}`);
					const IDIndex = controller.findIndex(resultID);
					console.log(`returned id index to edit is ${IDIndex}`);
					console.log(data.orders[IDIndex]);
					//create new order from item.orders[IDIndex]
					if (IDIndex != -1) { controller.removeFromData(IDIndex); };
				});
				res.end();
			}
			break;
	}
}).listen(port, () => `listening on port ${port}`);//callback fire when request on port recieved
