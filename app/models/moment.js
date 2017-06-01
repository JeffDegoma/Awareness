const mongoose = require('mongoose');

const momentSchema = new mongoose.Schema({
	moment: String,
	user: String,
	title: String
});

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment;
