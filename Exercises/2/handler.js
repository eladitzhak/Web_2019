/* eslint-disable require-jsdoc */

const data = require('./data');

const findIndex = function (IDVal) {
	console.log(`looking for id ${IDVal}`);
	let index = -1;

	data.orders.findIndex(function (item, i) {
		// eslint-disable-next-line eqeqeq
		if (item.id == IDVal) {
			index = i;
			console.log(`found i in index ${i} return..`);
			return i;
		}
	});
	return index;
};

module.exports = {
	findIndex
};
