const jwt = require("jsonwebtoken")

function routerAccess(tipos) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (!tipos.includes(decoded.tipo)) {
                return res.status(401).json({ msg: 'Unauthorized' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ msg: 'Token Inválido!' })
        }

    }
}

const adminAuth = routerAccess(['Admin'])
const userAuth = routerAccess(['User', 'Company', 'Employee', 'Admin'])
const companyAuth = routerAccess(['Company', 'Admin'])
const employeeAuth = routerAccess(['Employee', 'Company', 'Admin'])

module.exports = { adminAuth, userAuth, companyAuth, employeeAuth }