const express = require('express')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const auth = require('../../middleware/auth')
const isAdmin = require('../../middleware/isAdmin')

const router = express.Router()

//TODO case for self role change

router.post('/employee/:id', auth, isAdmin, async (req, res) => {
	try {
		let user = await User.findById(req.params.id)

		if (!user) {
			return res.status(400).json({ msg: 'User not found' })
		}

		if (user.role === 'employee') {
			return res.json({ msg: 'User is already an Employee' })
		}

		user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ role: 'employee' },
			{ new: true }
		)

		return res.json(user)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.post('/client/:id', auth, isAdmin, async (req, res) => {
	try {
		let user = await User.findById(req.params.id)

		if (!user) {
			return res.status(400).json({ msg: 'User not found' })
		}

		if (user.role === 'client') {
			return res.json({ msg: 'User is already a Client' })
		}

		user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ role: 'client' },
			{ new: true }
		)

		return res.json(user)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.post('/administrator/:id', auth, isAdmin, async (req, res) => {
	try {
		let user = await User.findById(req.params.id)

		if (!user) {
			return res.status(400).json({ msg: 'User not found' })
		}

		if (user.role === 'administrator') {
			return res.json({ msg: 'User is already an Administrator' })
		}

		user = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ role: 'administrator' },
			{ new: true }
		)

		return res.json(user)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
