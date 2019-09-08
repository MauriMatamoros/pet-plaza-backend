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
	day: {
		type: Date,
		required: true
	},
	time: {
		type: Date,
		required: true
	}
})

module.exports = MedicalAppointment = mongoose.model(
	'medicalAppointment',
	MedicalAppointmentSchema
)
