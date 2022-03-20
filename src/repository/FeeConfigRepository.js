import { FeeConfig } from 'database/models';
import APIException from 'utilities/APIException';
import { RESPONSE_MESSAGE } from 'utilities/Constants';

/**
 *@description class will implement database query
 *
 * @class FeeConfigRepository
 */
class FeeConfigRepository {
  /**
   * @description add fee configuration
   * @param {object} data - the data to be added to the config
   * @returns {object} object of response message
   */
  static async create(data) {
    try {
      return FeeConfig.create(data);
    } catch (err) {
      throw new APIException(RESPONSE_MESSAGE.SOMETHING_WENT_WRONT);
    }
  }

  /**
   * @description fetch fee configuration
   * @param {object} filterData - the query filter
   * @returns {Array} array of the positlbe fee configs
   */
  static async findBy(filterData) {
    try {
      return FeeConfig.find(filterData);
    } catch (err) {
      throw new APIException(RESPONSE_MESSAGE.SOMETHING_WENT_WRONT);
    }
  }
}

export default FeeConfigRepository;
