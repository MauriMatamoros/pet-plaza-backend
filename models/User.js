const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true 
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	role: {
		type: String,
		default: 'client'
	}
})

module.exports = User = mongoose.model('user', UserSchema)
