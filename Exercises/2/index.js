/* eslint-disable require-jsdoc */
var toatlticketsVal=10;
const { EventEmitter } = require('events');
const moment = require('moment');
const myEmit = require('./moment_event/index.js');
//#catch iif not enoufh details providedIDVal

class Order extends EventEmitter {
	constructor (_firstName, _lastName, _numOfTickets) {
		super();
		this.orderDate = moment().format('L');
		console.log('=------------------------------start class-----------');
		this.numOfTickets = _numOfTickets;
		this.fullName = _firstName + ' ' + _lastName;
		this.id = Order.getCount();
		Order.increaseCount();
		// console.log(`balcnace ${gettingBalance()}`);
		// console.log(`decresassing...  ${this.numOfTickets}`);
		// function calcTotalTickets (val) {
		// 	if (toatlticketsVal - val < 0) { console.log(`Error! not enough ticjets! ${toatlticketsVal}`); return 'failed: not enough tickets'; }
		// 	toatlticketsVal -= val;
		// 	return 'Pass';
		// };
		// const result = calcTotalTickets(_numOfTickets);
		// if (result === 'Pass') {
		// 	this.status = 'OK';
		// } else {
		// 	this.status = result;
		// };
		// console.log(result);
		// console.log('after  decareasing ticekts ' + getTicketsNumber());
		console.log('new order created');
		// myEmit.emit('whatsTheDate');
	} // end constructior
	;
	editTicketNumberDecrease (ticketsToDecrease) {
		toatlticketsVal += ticketsToDecrease;
		console.log(`return ${ticketsToDecrease} tickets, total amount of tickets updated: ${toatlticketsVal}`)
		myEmit.emit('ticketsEvent');
	}

	editTicketNumberIncrease (ticketsToincrease) {
		if (toatlticketsVal - ticketsToincrease < 0) {
			console.log(`Error! not enough tickets! cannot allocate ${ticketsToincrease} tickets`);
		} else {
			this.numOfTickets += ticketsToincrease;
			toatlticketsVal -= ticketsToincrease;
			console.log(`user tickets number increased to ${ticketsToincrease} total ampunt of tickets to allocate is ${toatlticketsVal}`);
		}
	}

	static increaseCount () {
		this.count += 1;
	}

	static getCount () {
		return this.count;
	}

	calcDecreaseTicketsRequest (val) {
		if (toatlticketsVal - val < 0) { console.log(`Error! not enough ticjets! ${toatlticketsVal}`); return 'failed: not enough tickets'; }
		toatlticketsVal -= val;
		return 'Pass';
	};
};

//set name set number of tickets -->insode emit include emit  const Emitter = require('events');
class User {
	constructor (_name, _type = 'user') {
		this.name = name;
		this.type = _type;
	}
}

//  function decreaseTicketsNumber (val) {
// 	 console.log(`inside decresing : val is ${val}`);
// 	if (toatlticketsVal + val > 10) {
// 		return false;
// 	}
// 	toatlticketsVal += val;
// 	return true;

// }

module.exports = Order;
// eslint-disable-next-line require-jsdoc

// 	get userName () {
// 		return this.name;
// 	}
// }

Order.count = 1;

function increaseTicketsNumber(value) {
	toatlticketsVal += value;
}


function getTicketsNumber () {
	return toatlticketsVal;
}
// }
//---------methods----

function gettingBalance() {
	
		
		return toatlticketsVal;
	
}

// getypeofuser

// neworder

// deleteorde

// updateorder

// showallorders(adminonly)

// resetallorders(adminonly)
// getallsystemlogs(adminonlu)

//---------methods----
function levelOne (value, callback) {
	var newScore = value + 5;
	toatlticketsVal += value;
	if (toatlticketsVal + value > 11) {
		newScore = 'fail';
	}
    callback(newScore);
}

function decTicketsNumber (numOfTicketsUsed) {
	toatlticketsVal -= numOfTicketsUsed;
}