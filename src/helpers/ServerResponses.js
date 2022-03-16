/**
* @description class will implement functionalities for all server responses
*
* @class HomeController
*/
class ServerResponses {
  /**
       * @description - for success ok
       * @param {object} res the response object
       * @param {string} message The message to the client
       * @param {object} data the data to from the activity
       * @param {Number} responseCode request response code
       * @param {Number} statusCode the status code to be sent to user
       * @param {String} status the status of the event
       * @returns {object} returns response object with the necessary info
       */
  static successOk(res, message, data = {}, responseCode = '00', statusCode = 200,
    status = 'success') {
    return res.status(statusCode).json({
      message,
      status,
      data,
      responseCode
    });
  }

  /**
   * @description - for error response
   * @param {object} res the response object
   * @param {string} message The message to the client
   * @param {object} error the data to from the activity
   * @param {Number} responseCode request response code
   * @param {Number} statusCode the status code to be sent to user
   * @param {String} status the status of the event
   * @returns {object} returns response object with the necessary info
   */
  static appError(res, message, error = null, responseCode = null, statusCode = 400,
    status = 'error') {
    return res.status(statusCode).json({
      message,
      status,
      error,
      responseCode
    });
  }
}

export default ServerResponses;
