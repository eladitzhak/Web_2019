/* eslint-disable require-jsdoc */
const { EventEmitter } = require('events');
const moment = require('moment');
// const myEmit = require('./moment_event/index.js');
let id = 0;

module.exports = class Order extends EventEmitter {
	constructor (_firstName, _lastName, _numOfTickets) {
		super();
		this.id = ++id;
		this.orderDate = moment().format('L');
		this.numOfTickets = _numOfTickets;
		this.fullName = _firstName + ' ' + _lastName;
		console.log('new order created');
		this.emit('orderCreated');
	} // end constructior

	getAllInfo () {
		return (`id: ${this.id}  fullname: ${this.fullName}  orderDate: ${this.orderDate} numOfTickets: ${this.numOfTickets} `);
	}

	getOrderTickets () {
		return this.numOfTickets;
	}

	setNumberOfTickets (number) {
		this.numOfTickets = number;
		this.emit('orderChanged');
	}

	setName (name) {
		this.fullName = name;
		this.emit('orderChanged');
	}

	// setNumOfTickets (ticketsNum) {
	// 	this.numOfTickets = ticketsNum;
	// 	console.log(`new amount of tickets for order ${this.Order}: ${ticketsNum} `);
	// 	this.emit('OrderChanged');
	// }
};
