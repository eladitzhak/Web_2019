const { Schema, model } = require('mongoose');

const slidesSchema = new Schema({
	id: { type: Number, required: true },
	userid: { type: Number, required: true },
	username: { type: String, required: true },
	slides: { type: Array }

}, { collection: 'slides' });

const Slide = model('Slides', slidesSchema);

module.exports = Slide;
