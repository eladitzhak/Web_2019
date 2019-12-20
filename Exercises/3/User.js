const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	id: { type: Number, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String },
	username: { type: String, required: true },
	phone: { type: Number },
	email: { type: String },
	slidesQty: { type: Number },
	slidesId: { type: Number }

}, { collection: 'user' });

const User = model('User', userSchema);

module.exports = User;
