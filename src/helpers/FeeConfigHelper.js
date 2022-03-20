import {
  FEE_TYPE, LOCALE, PRECEDENCE_MARKER,
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
     * @param {Array} feeData - the fee config data gotten from db
     * @returns {object} object of the right fee config
     */
  static getRightFeeConfig(feeData) {
    let highestPredenceCount = 0;
    let precedenceIndex = 0;
    feeData.map((feeConfig, index) => {
      let precedenceCount = 0;
      const {
        currency, locale, feeEntity, entityProperty
      } = feeConfig;

      // count the number of precedence
      precedenceCount += currency !== PRECEDENCE_MARKER && 1;
      precedenceCount += locale !== PRECEDENCE_MARKER && 1;
      precedenceCount += feeEntity !== PRECEDENCE_MARKER && 1;
      precedenceCount += entityProperty !== PRECEDENCE_MARKER && 1;

      if (precedenceCount > highestPredenceCount) {
        highestPredenceCount = precedenceCount;
        precedenceIndex = index;
      }
    });

    return feeData[precedenceIndex];
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
