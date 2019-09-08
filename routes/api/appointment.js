const express = require('express')

const auth = require('../../middleware/auth')
const GroomingAppointment = require('../../models/GroomingAppointment')
const HotelAppointment = require('../../models/HotelAppointment')
const MedicalAppointment = require('../../models/MedicalAppointment')

const router = express.Router()

module.exports = router
