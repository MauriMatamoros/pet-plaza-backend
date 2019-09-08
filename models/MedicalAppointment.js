const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MedicalAppointmentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	doctor: {
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
	}
})

module.exports = MedicalAppointment = mongoose.model(
	'medicalAppointment',
	MedicalAppointmentSchema
)
