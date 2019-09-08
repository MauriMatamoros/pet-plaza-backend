const express = require('express')
const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const GroomingAppointment = require('../../models/GroomingAppointment')
const HotelAppointment = require('../../models/HotelAppointment')
const MedicalAppointment = require('../../models/MedicalAppointment')

const router = express.Router()

router.post(
	'/grooming',
	[
		auth,
		[
			check('date', 'Date is required')
				.not()
				.isEmpty(),
			check('time', 'Time is required')
				.not()
				.isEmpty(),
			check('size', 'Size is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { date, time, size } = req.body

			const appointmentFields = {
				date,
				time,
				size,
				user: req.user.id
			}

			let appointment = await GroomingAppointment.findOne({ date, time })
			if (appointment) {
				return res.status(409).json({
					msg:
						'Sorry, there is already a grooming appointment booked at this time'
				})
			}

			appointment = new GroomingAppointment(appointmentFields)
			await appointment.save()
			res.json(appointment)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

router.post(
	'/hotel',
	[
		auth,
		[
			check('date', 'From date is required')
				.not()
				.isEmpty(),
			check('time', 'To date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { from, to, room } = req.body

			const appointmentFields = {
				from,
				to,
				room,
				user: req.user.id
			}

			let appointment = await HotelAppointment.findOne({ from, to, room })
			if (appointment) {
				return res.status(409).json({
					msg: 'Sorry, there is already a hotel appointment booked in this room'
				})
			}

			appointment = new HotelAppointment(appointmentFields)
			await appointment.save()
			res.json(appointment)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

router.post(
	'/medical',
	[
		auth,
		[
			check('date', 'Date is required')
				.not()
				.isEmpty(),
			check('time', 'Time is required')
				.not()
				.isEmpty(),
			check('doctor', 'Doctor is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { date, time, doctor } = req.body

			const appointmentFields = {
				date,
				time,
				doctor,
				user: req.user.id
			}

			let appointment = await MedicalAppointment.findOne({ date, time, doctor })
			if (appointment) {
				return res.status(409).json({
					msg:
						'Sorry, there is already a medical appointment booked for this doctor'
				})
			}

			appointment = new MedicalAppointment(appointmentFields)
			await appointment.save()
			res.json(appointment)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

module.exports = router
