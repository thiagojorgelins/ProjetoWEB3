const jwt = require("jsonwebtoken")

function routerAccess(tipo) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.tipo !== tipo && decoded.tipo !== 'Admin') {
                return res.status(401).json({ msg: 'Unauthorized' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ msg: 'Token Inválido!' })
        }

    }
}

const adminAuth = routerAccess('Admin')
const userAuth = routerAccess('User')
const companyAuth = routerAccess('Company')
const employeeAuth = routerAccess('Employee')

module.exports = { adminAuth, userAuth, companyAuth, employeeAuth }