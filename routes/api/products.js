const express = require('express')
const { check, validationResult } = require('express-validator')

const Product = require('../../models/Product')
const auth = require('../../middleware/auth')
const isAdmin = require('../../middleware/isAdmin')

const router = express.Router()

//TODO maybe refactor post route to two routes for restocking purposes?

router.post(
	'/',
	[
		auth,
		isAdmin,
		[
			check('name', 'Name is required.')
				.not()
				.isEmpty(),
			check('inStock', 'inStock is required.')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		try {
			const { name, inStock, description, img } = req.body
			const productFields = { name, inStock }

			if (description) productFields.description = description
			if (img) productFields.img = img

			let product = await Product.findOne({ name })
			//TODO change to search for ID
			if (product) {
				product = await Product.findOneAndUpdate(
					{ name },
					{
						$set: productFields
					},
					{ new: true }
				)
				return res.json(product)
			}

			product = new Product(productFields)
			await product.save()
			res.json(product)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

router.get('/', async (req, res) => {
	try {
		//TODO create pagination on this route
		const products = await Product.find()
		res.json(products)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.get('/:id', async (req, res) => {
	try {
		//TODO create pagination on this route
		let product = await Product.findById(req.params.id)
		if (!product) {
			return res.status(404).json({ msg: 'No product with that id exists.' })
		}
		product = await Product.findById(req.params.id)
		res.json(product)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

router.delete('/:id', auth, isAdmin, async (req, res) => {
	try {
		//TODO create pagination on this route
		let product = await Product.findById(req.params.id)
		if (!product) {
			return res.status(404).json({ msg: 'No product with that id exists.' })
		}
		product = await Product.findByIdAndDelete(req.params.id)
		res.json(product)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
