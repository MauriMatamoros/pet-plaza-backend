const mongoose = require('mongoose')

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
    day: {
        type: Date,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    size: {
        type: String,
        required: true
    }
})

module.exports = GroomingAppointment = mongoose.model('groomingAppointments', GroomingAppointmentSchema)