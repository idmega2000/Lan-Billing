/**
* @description class will implement functionalities for all server responses
*
* @class HomeController
*/
class ServerResponses {
  /**
   * @description - for success ok
   * @param {object} res the response object
   * @param {String} responseData the response data object
   * @param {String} statusCode the status code of the response
   * @returns {object} returns response object with the necessary info
   */
  static response(res, responseData = {}, statusCode = 200) {
    return res.status(statusCode).json(responseData);
  }
}

export default ServerResponses;
