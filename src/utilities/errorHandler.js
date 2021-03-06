import logger from 'utilities/logger';
import APIException from './APIException';
import { RESPONSE_MESSAGE } from './Constants';
import ServerResponses from './ServerResponses';

/**
     * @description the app ues a general global exception handler
     * @param {object} err - response body
     * @param {object} req - request body
     * @param {object} res - response body
     * @param {object} next - the error object
     * @returns {Error} - object representing response response
     */
export const generalErrorHandler = (err, req, res, next) => {
  const {
    name,
  } = err;
  let { message, statusCode } = err;
  switch (name) {
  case 'ValidationError':
    // statusCode = 400;
    break;

  case ('SyntaxError'):
    // handle invalid json
    message = RESPONSE_MESSAGE.INVALID_JSON;
    break;

  default:
    // server errors
    statusCode = 500;
    message = RESPONSE_MESSAGE.SOMETHING_WENT_WRONT;
  }
  logger.error(err);
  console.log(err);
  return ServerResponses.response(res, { Error: message }, statusCode);
};

/**
     * @description handle reoute not found
     * @param {object} req - request body
     * @param {object} res - response body
     * @param {object} next - the error object
     * @returns {Error} - object representing response response
     */
export const notFoundHander = (req, res, next) => {
  const err = new APIException(RESPONSE_MESSAGE.NOT_FOUND);
  err.status = 404;
  next(err);
};
