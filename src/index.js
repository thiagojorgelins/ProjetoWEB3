require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3300

app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(port, ()=> {
    console.log(`Server running in port ${port}`)
})