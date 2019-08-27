const mongoose = requrie('mongoose')

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
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    }
})

module.exports = HotelAppointment = mongoose.model('hotelAppointments', HotelAppointmentSchema)