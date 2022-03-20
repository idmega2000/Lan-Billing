import {
  FEE_TYPE, LOCALE, PRECEDENCE_MARKER, SUPPORTED_ENTITY_FEE,
} from 'utilities/Constants';

/**
 *@description class will implement helper functionality for fee config service
 *
 * @class FeeConfigHelper
 */
class FeeConfigHelper {
  /**
     * @description get the locale of the transaction
     * @param {string} country - the country of the transaction
     * @param {string} currencyCountry - the country of the currency
     * @returns {string} the locale
     */
  static getLocale(country, currencyCountry) {
    return country && currencyCountry && country === currencyCountry ? LOCALE.LOCL : LOCALE.INTL;
  }

  /**
     * @description get the right fee config
     * @param {Array} feeConfigData - the fee config data gotten from db
     * @returns {object} object of the right fee config
     */
  static getRightFeeConfig(feeConfigData) {
    // asterisk count tracker
    let highestAsteriskCount = 0;

    // variable to track the the index of the right fee config to use
    let precedenceIndex = 0;
    // loop through the fee data array
    feeConfigData.map((feeConfig, index) => {
      let asteriskCount = 0;
      const {
        currency, locale, feeEntity, entityProperty
      } = feeConfig;

      // count the number of asterisk
      asteriskCount += currency !== PRECEDENCE_MARKER && 1;
      asteriskCount += locale !== PRECEDENCE_MARKER && 1;
      asteriskCount += feeEntity !== PRECEDENCE_MARKER && 1;
      asteriskCount += entityProperty !== PRECEDENCE_MARKER && 1;

      // check that asterisk count is greater than the current
      // asterisk count tracker
      if (asteriskCount > highestAsteriskCount) {
        highestAsteriskCount = asteriskCount;

        // set this index as the right index
        precedenceIndex = index;
      }
    });

    // Note that the implementation only account for the count of asterisk as the precedence
    // without giving precedence to any keyword in the data.(keep it simple and clean)
    return feeConfigData[precedenceIndex];
  }

  /**
     * @description get the charge amount
     * @param {boolean} bearsFee - whether the transaction owner bears the fee
     * @param {number} amount - the amount of the transaction
     * @param {number} appliedFeeValue - the applied fee
     * @returns {number} the charge amount
     */
  static getChargeAmount(bearsFee, amount, appliedFeeValue) {
    return bearsFee ? amount + appliedFeeValue : amount;
  }

  /**
     * @description get applied fee
     * @param {string} feeType - the fee type
     * @param {string} feeValue - the fee value
     * @param {number} amount - the amount
     * @returns {number} the applied fee value
     */
  static getAppliedFee(feeType, feeValue, amount) {
    switch (feeType) {
    case FEE_TYPE.FLAT:
      return FeeConfigHelper.getNumber(feeValue);
    case FEE_TYPE.PERC:
      const percentageNum = FeeConfigHelper.getNumber(feeValue);
      return (amount * percentageNum) / 100;
    case FEE_TYPE.FLAT_PERC:
      const [fixed, percentage] = feeValue.split(':');
      const fixedNum = FeeConfigHelper.getNumber(fixed);
      const percentageVal = FeeConfigHelper.getNumber(percentage);
      return fixedNum + ((amount * percentageVal) / 100);
    default:
      return 0;
    }
  }

  /**
     * @description generate the single column query data
     * @param {string} data - the business name of the company
     * @returns {Array} object of response message
     */
  static generateData(data) {
    return [data, '*'];
  }

  /**
     * @description check if entity type is valid
     * @param {string} feeType - the business name of the company
     * @returns {boolean} boolean value
     */
  static isValidFeeEntity(feeType) {
    return SUPPORTED_ENTITY_FEE.includes(feeType);
  }

  /**
     * @description generate entity query data
     * @param {Array} data - the array cocntaining the entity data
     * @returns {Array} new array with the data having asterisk
     */
  static generateEntityData(data) {
    data.push('*');
    return data;
  }

  /**
   * @description generate number value
   * @param {string} value - the value to be converted
   * @returns {number} new array with the data having asterisk
   */
  static getNumber(value) {
    return (Number(value) || 0);
  }
}
export default FeeConfigHelper;
