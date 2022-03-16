/**
* @description a general excetption handler
*
* @class APIException
*/
class APIException extends Error {
  /**
           * @description validate the request body
           * @param {string} message - message to be displayed
           * @param {number} statusCode - status code
           * @param {object} errors -error data
           * @param {string} status - status
           * @param {string} responseCode - responseCode
           * @param {string} name - name
           * @param {string} user - user
           * @returns {Error} - object representing response error
           */
  constructor(message, statusCode = 500, errors = {},
    status = 'error', responseCode = null, name = 'ValidationError',
    user = {}) {
    super(message);
    this.name = name;
    this.status = status;
    this.error = errors;
    this.message = message;
    this.dateTime = new Date();
    this.user = user;
    this.responseCode = responseCode;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, APIException);
  }
}
export default APIException;
