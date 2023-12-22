const jwt = require('jsonwebtoken');
const { RequestValidationError } = require('../errors/RequestValidationError');
const { AccessTokenError, RefreshTokenError } = require('../errors/JWTAuthError');

exports.verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if(accessToken == null){
        return next(new RequestValidationError('Access Token is not passed.'));
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return next(new AccessTokenError(err.message));
        }
        req.user = user;
        next();
    });
}

exports.verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.signedCookies.refreshToken;

    if(refreshToken == null){
        return next(new RequestValidationError('Refresh Token is not passed.'));
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err){
            return next(new RefreshTokenError(err.message));
        }
        req.user = user;
        next();
    });
}