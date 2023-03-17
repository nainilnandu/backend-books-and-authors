const mockData = require('../data/mockData')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundAuthor = await mockData.authors.find(obj => obj.email === email)

    if (!foundAuthor) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await mockData.authors.find(obj => obj.password === password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": match.email,
                "name": match.name,
                "id": match.id,
                "phone_no": match.phone_no,
                "likedBooks": match.likedBooks? match.likedBooks:[]
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    console.log(accessToken.UserInfo)

    const refreshToken = jwt.sign(
        { "email": foundAuthor.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // Send accessToken containing user details
    res.json({ accessToken })
}


// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    logout
}