const express = require('express')
const router = express.Router()

const UserRoutes = require('./routes/user.routes')
const AdminRoutes = require('./routes/admin.routes')
const CompanyRoutes = require('./routes/company.routes')

router.use(UserRoutes)
router.use(AdminRoutes)
router.use(CompanyRoutes)

module.exports = router