const jwtToken = require('jsonwebtoken');
const catchError = require('../utils/catchError');

exports.genrateToken = catchError(async (userid, statuscode, res) => {
    const token = jwtToken.sign({id: userid}, process.env.jwt_secret, {
        expiresIn: "7d",
    });
    const option = {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 3600000),
        httpOnly: false,
        sameSite: 'lax',
    }
    return res.status(statuscode).cookie(String(userid), token, option).json({
        success: true,
        message: "Login Successfully"
    })
})

 
exports.verifyToken = catchError(async (req, res, next) => {
  
const cookieData = req.cookies;
if (!cookieData) {
    return res.status(400).json({message: "No Cookie Found"})
}
const token = Object.values(cookieData)[0];

if (!token) {
    return res.status(400).json({message: "No Token Found"})
} else {
    return jwtToken.verify(token, process.env.jwt_secret, async (err, user) => {
        if (err) {
            return res.status(400).json({message: "InValid Token"});
        } else {
            req.id = user.id.userid;
        
            next()
        }
    })
}
})


 