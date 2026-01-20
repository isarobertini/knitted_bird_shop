
/**
 * Send standardized error response
 * @param {Response} res - Express response
 * @param {Number} status - HTTP status code
 * @param {String} message - Error message
 * @param {Error} [err] - optional original error for logging
 */
export const sendError = (res, status, message, err = null) => {
    if (err) console.error(message, err);
    return res.status(status).json({ success: false, error: message });
};

/**
 * Send standardized success response
 * @param {Response} res
 * @param {Object} data - any data to include
 * @param {Number} [status=200]
 */
export const sendSuccess = (res, data = {}, status = 200) => {
    return res.status(status).json({ success: true, ...data });
};