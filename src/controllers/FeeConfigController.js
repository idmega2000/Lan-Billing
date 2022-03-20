import ServerResponses from 'utilities/ServerResponses';
import FeeConfigService from 'services/FeeConfigService';

/**
 *@description class will implement functionality for fee configuration
 *
 * @class FeeConfigController
 */
class FeeConfigController {
  /**
   * @description add a fee configuration
   * @param {object} req - Request object created by express for the route
   * @param {object} res - Response object created by express for the route
   * @param {function} next - Call back function to pass on data to the next middleware
   * @returns {object} response object
   */
  static async addFeeConfig(req, res, next) {
    const {
      FeeConfigurationSpec
    } = req.body;

    try {
      const addData = await FeeConfigService.addFeeConfig(FeeConfigurationSpec);
      return ServerResponses.response(res, addData);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @description fetch the transaction billing data
   * @param {object} req - Request object created by express for the route
   * @param {object} res - Response object created by express for the route
   * @param {function} next - Call back function to pass on data to the next middleware
   * @returns {object} response of billing data
   */
  static async conputeBillingConfig(req, res, next) {
    try {
      const billingData = await FeeConfigService.getBillingFees(req.body);
      return ServerResponses.response(res, billingData);
    } catch (error) {
      return next(error);
    }
  }
}

export default FeeConfigController;
