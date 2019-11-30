const Emitter = require('events');
let eventConfig = require('./config');
const myEmtr = new Emitter();
module.exports = myEmtr;

let moment = require('moment');

myEmtr
	.on(eventConfig.HELLO, () => {
		console.log('who called hello?');
	})
	.on(eventConfig.DATE, () => {
		const CurrentDate = moment().format('L');
		console.log(`date is: ${CurrentDate}`);
	})
	.on('whatsTheDate', () => {
		console.log(`current date is ${moment().format('L')} `);
	})
	.on ('ticketsEvent', () => {
		console.log('Tickets event!')
	});

// myEmtr.emit(eventConfig.HELLO);
// const dateRequest = myEmtr.emit('whatsTheDate');

// module.exports = dateRequest;
