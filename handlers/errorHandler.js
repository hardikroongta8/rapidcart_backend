const {CustomError} = require('../errors/CustomError');

module.exports = (err, req, res, next) => {
    console.error(err.message);
    if(err instanceof CustomError){
        res.status(err.statusCode).json({
            success: false,
            message: err.message, 
            error: err.name
        });
    } else {
        res.status(500).json({
            success: false,
            message: err.message,
            error: 'Internal server error'
        });
    }
}