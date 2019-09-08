const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const GroomingAppointmentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	size: {
		type: String,
		required: true
	}
})

module.exports = GroomingAppointment = mongoose.model(
	'groomingAppointment',
	GroomingAppointmentSchema
)
