const { CustomError } = require("./CustomError");

exports.RequestValidationError = class RequestValidationError extends CustomError{
    constructor(message){
        super(message, 400, 'Bad request error');
    }
}