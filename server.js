require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3500

app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use('/auth', require('./routes/authRoutes'))
app.use('/authors', require('./routes/authorRoutes'))
app.use('/books', require('./routes/bookRoutes'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

