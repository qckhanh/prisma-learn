"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
/**
 * Custom HTTP error class for standardized error handling in Express applications.
 */
class HttpError extends Error {
    /**
     * Creates an instance of HttpError.
     * @param message - The error message to be sent to the client.
     * @param statusCode - The HTTP status code (defaults to 500).
     * @param code - Optional error code for client-side handling.
     */
    constructor(message, statusCode = 500, code) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.code = code;
    }
}
exports.HttpError = HttpError;
