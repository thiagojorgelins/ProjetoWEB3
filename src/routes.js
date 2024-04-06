const express = require('express')
const router = express.Router()

const UserRoutes = require('./routes/user.routes')
const AdminRoutes = require('./routes/admin.routes')
const CompanyRoutes = require('./routes/company.routes')
const ReviewRoutes = require('./routes/review.routes')
const JobRoutes = require('./routes/job.routes')

router.use(UserRoutes)
router.use(AdminRoutes)
router.use(CompanyRoutes)
router.use(ReviewRoutes)
router.use(JobRoutes)

module.exports = router