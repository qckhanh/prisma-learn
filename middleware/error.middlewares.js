"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const httpsError_helpers_1 = require("../helpers/httpsError.helpers");
function errorMiddleware(err, req, res, _next) {
    let error = err instanceof httpsError_helpers_1.HttpError
        ? err
        : new httpsError_helpers_1.HttpError(err.message || 'Internal Server Error', 500, 'UNKNOWN_ERROR');
    const statusCode = error.statusCode || 500;
    const response = {
        success: false,
        message: error.message || 'Internal Server Error',
        code: error.code || 'UNKNOWN_ERROR',
    };
    // Send response
    res.status(statusCode).json(response);
}
exports.default = errorMiddleware;
