const express = require('express')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const isDoctor = require('../../middleware/isDoctor')

const router = express.Router()

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		if (!profile) {
			res.status(400).json({ msg: 'There is no profile for this user' })
		}

		res.json(profile)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.post(
	'/',
	[
		auth,
		[
			check('gender', 'Gender is required')
				.not()
				.isEmpty(),
			check('address', 'Address is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { gender, address } = req.body

		const profileFields = {}

		profileFields.user = req.user.id
		if (gender) profileFields.gender = gender
		if (address) profileFields.address = address

		try {
			let profile = await Profile.findOne({ user: req.user.id })
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{
						$set: profileFields
					},
					{ new: true }
				)
				return res.json(profile)
			}

			profile = new Profile(profileFields)
			await profile.save()
			res.json(profile)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

router.put('/social', auth, isDoctor, async (req, res) => {
	const { youtube, facebook, twitter, instagram, linkedin } = req.body
	const social = {}

	if (youtube) social.youtube = youtube
	if (facebook) social.facebook = facebook
	if (twitter) social.twitter = twitter
	if (instagram) social.instagram = instagram
	if (linkedin) social.linkedin = linkedin

	try {
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: { social } },
			{ new: true }
		)
		res.json(profile)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.put(
	'/education',
	[
		auth,
		isDoctor,
		[
			check('school', 'School is required')
				.not()
				.isEmpty(),
			check('degree', 'Degree is required')
				.not()
				.isEmpty(),
			check('fieldOfStudy', 'Field of study is required')
				.not()
				.isEmpty(),
			check('from', 'From date is required')
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

			const {
				school,
				degree,
				fieldOfStudy,
				from,
				to,
				current,
				description
			} = req.body

			const newEducation = {
				school,
				degree,
				fieldOfStudy,
				from,
				to,
				current,
				description
			}

			try {
				const profile = await Profile.findOne({ user: req.user.id })
				profile.education.unshift(newEducation)
				await profile.save()
				res.json(profile)
			} catch (error) {
				console.error(error.message)
				res.status(500).send('Server Error')
			}
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

router.delete('/education/:id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })
		const removeIndex = profile.education
			.map(({ id }) => id)
			.indexOf(req.params.id)
		profile.education.splice(removeIndex, 1)
		await profile.save()
		res.json(profile)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.put('/education', auth, isDoctor, async (req, res) => {})

module.exports = router
