const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
    return accessToken;
}

exports.generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '15d',
    });
    return refreshToken;
}