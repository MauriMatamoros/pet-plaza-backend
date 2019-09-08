const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	gender: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	social: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldOfStudy: {
				type: String,
				required: true
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	pet: [
		{
			pet: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'pet'
			}
		}
	]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
