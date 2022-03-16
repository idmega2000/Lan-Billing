import logger from 'helpers/logger';
import APIException from './APIException';
import { RESPONSE_MESSAGE } from './Constants';
import ServerResponses from '../helpers/ServerResponses';

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
    errors, responseCode, name
  } = err;
  let { message } = err;
  switch (name) {
  case 'ValidationError':
    break;

  case ('SyntaxError'):
    // handle invalid json
    message = RESPONSE_MESSAGE.INVALID_JSON;
    break;

  default:
    // server errors
    message = RESPONSE_MESSAGE.SOMETHING_WENT_WRONT;
  }
  logger.error(err);
  return ServerResponses.appError(res, message, errors, responseCode);
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
