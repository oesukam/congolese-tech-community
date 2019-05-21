/**
 * Handles controller errors
 *
 * @class Errors
 */
class Errors {
    /**
     * Handles errors
     *
     * @static
     * @param {*} res
     * @param {*} e
     * @returns {object} error
     * @memberof Errors
     */
    static errorResponse(res, e) {
        return res.status(500).json({
            status: 500,
            message: e.message,
        });
    }
}

export default Errors;
