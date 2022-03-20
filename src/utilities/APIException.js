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
           * @param {string} status - status
           * @param {string} name - name
           * @param {string} user - user
           * @returns {Error} - object representing response error
           */
  constructor(message, statusCode = 400,
    status = 'error', name = 'ValidationError') {
    super(message);
    this.name = name;
    this.status = status;
    this.message = message;
    this.dateTime = new Date();
    this.statusCode = statusCode;
    Error.captureStackTrace(this, APIException);
  }
}
export default APIException;
