const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HotelAppointmentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true
	}
})

module.exports = HotelAppointment = mongoose.model(
	'hotelAppointment',
	HotelAppointmentSchema
)
