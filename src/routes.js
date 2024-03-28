const express = require('express')
const router = express.Router()

const UserRoutes = require('./routes/user.routes')
const AdminRoutes = require('./routes/admin.routes')

router.use(UserRoutes)
router.use(AdminRoutes)

module.exports = router