const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')

const PORT = process.env.PORT || 3000
const app = express()

connectDB()

app.use(cors())
app.use(express.json({ extended: false }))

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/roles', require('./routes/api/roles'))

app.listen(PORT, (err) =>
	err ? console.error(err) : console.log(`Server is running on ${PORT}...`)
)
