const authController = require('../controllers/authController');
const asyncErrorHandler = require('../handlers/asyncErrorHandler.js');
const { verifyRefreshToken } = require('../middlewares/verifyTokens.js');

const authRouter = require("express").Router();

authRouter.post('/google', authController.googleAuthHandler);
authRouter.get('/google/callback', asyncErrorHandler(authController.googleCallbackHandler));
authRouter.post('/logout', authController.logout);
authRouter.post('/regenerate_access_token', 
    verifyRefreshToken, authController.regenerateAccessToken);

module.exports = authRouter;