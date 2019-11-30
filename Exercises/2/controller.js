/* eslint-disable require-jsdoc */
const data = require('./data');
// console.log(data.orders);

module.exports.getDataDetails = function (indexValue) {
	console.log(`getting data fron orders index ${indexValue}`);
	let filteredObj = data.orders[indexValue];
	console.log(filteredObj.first_name,filteredObj.last_name);
};

module.exports.findIndex =	function (IDVal) {
	console.log(`looking for id ${IDVal}`);
	let index = -1;
	const val = 'id';
	let filteredObj = data.orders.findIndex(function (item, i) {
		console.log(item.id, i);
		if (item.id == IDVal) {
			index = i;
			console.log(`found i in index ${i}`);
			return i;
		}
		if (index == -1) {
			console.log(`cannot dind ID ${IDVal} in data `);
		}
	});
	return index;
};

module.exports.removeFromData = function (indexVal) {
	console.log(`index to remove from dats is ${indexVal}`);
	console.log(data.orders);
	data.orders.splice(indexVal, 1);
	console.log(`data after remove index ${indexVal}  ${data.orders} `);
};
