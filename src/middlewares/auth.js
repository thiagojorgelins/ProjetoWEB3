const jwt = require("jsonwebtoken")

function adminAcess(tipo) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ msg: "Unauthorized" })
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.tipo !== tipo) {
                return res.status(401).json({ error: 'Unauthorized' })
            }
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ msg: 'Invalid Token!' })
        }

    }
}

const adminAuth = adminAcess('Admin')

module.exports = { adminAuth }