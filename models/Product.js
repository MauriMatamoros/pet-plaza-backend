const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	inStock: {
		type: Number,
		required: true
	},
	description: {
		type: String
	},
	img: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = Product = mongoose.model('product', ProductSchema)
