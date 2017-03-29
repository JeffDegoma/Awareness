const mongoose = require('mongoose')

const momentSchema = new mongoose.Schema({
	moment: String
})

const Moment = mongoose.model('Moment', momentSchema);

module.exports = Moment
