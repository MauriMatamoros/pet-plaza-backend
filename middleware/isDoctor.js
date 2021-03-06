const User = require('../models/User')

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id)

		if (user.role !== 'doctor') {
			return res.status(401).json({ msg: 'Not a Doctor, authorization denied' })
		}

		next()
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
}
