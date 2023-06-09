const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.name = decoded.UserInfo.name
            req.email = decoded.UserInfo.email
            req.id = decoded.UserInfo.id
            req.phone_no = decoded.UserInfo.phone_no
            req.likedBooks = decoded.UserInfo.likedBooks
            next()
        }
    )
}

module.exports = verifyJWT 