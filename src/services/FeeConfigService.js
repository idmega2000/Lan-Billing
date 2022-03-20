import FeeConfigHelper from 'helpers/FeeConfigHelper';
import FeeConfigRepository from 'repository/FeeConfigRepository';
import APIException from 'utilities/APIException';
import {
  RESPONSE_MESSAGE
} from 'utilities/Constants';

/**
 *@description class will implement functionality for fee config service
 *
 * @class FeeConfigService
 */
class FeeConfigService {
  /**
     * @description add fee configuration
     * @param {object} feeConfigurationSpec - the business name of the company
     * @returns {object} object of response message
     */
  static async addFeeConfig(feeConfigurationSpec) {
    // this can be done is a seperate validation file
    if (!feeConfigurationSpec) {
      throw new APIException(RESPONSE_MESSAGE.NO_FEE_DATA);
    }

    // loop split and loop through the data
    const configData = feeConfigurationSpec.split(/\n+/).map((feeConfig) => {
      // split with the : to divide into two, it would be easy to interact with the code
      const splittedData = feeConfig.split(/\s+:\s+/);
      const [feeId, currency, locale, entity] = splittedData[0].split(/\s+/);
      const [_, feeType, feeValue] = splittedData[1].split(/\s+/);

      // get the index of the first curly bracket
      const indexOfCurlyStart = entity.indexOf('(');

      const feeEntity = entity.substring(0, indexOfCurlyStart);
      const feeEntityValid = FeeConfigHelper.isValidFeeEntity(feeEntity);

      if (!feeEntityValid) {
        throw new APIException(RESPONSE_MESSAGE.INVALID_ENTITY_FEE);
      }

      return {
        feeId,
        currency,
        locale,
        feeEntity: entity.substring(0, indexOfCurlyStart),
        entityProperty: entity.substring(indexOfCurlyStart + 1, entity.indexOf(')')),
        feeType,
        feeValue,
      };
    });

    // insert data into the fee cconfig collection/table
    await FeeConfigRepository.create(configData);
    return { status: RESPONSE_MESSAGE.OK };
  }

  /**
         * @description get transacction billing fees
         * @param {object} transactionData - the business name of the company
         * @returns {object} object of response message
         */
  static async getBillingFees(transactionData) {
    // check data
    if (Object.keys(transactionData).length === 0) {
      throw new APIException(RESPONSE_MESSAGE.NO_TRANSACTION_DATA);
    }
    const {
      Currency, CurrencyCountry, Amount,
      Customer: { BearsFee }, PaymentEntity
    } = transactionData;

    const amount = FeeConfigHelper.getNumber(Amount);

    // get the fee config data as selected from the db layer
    const feeConfigData = await FeeConfigService
      .getFeeConfig(Currency, CurrencyCountry, PaymentEntity);

    if (!feeConfigData.length) {
      throw new APIException(RESPONSE_MESSAGE.NO_FEE_COMFIG_FOUND);
    }

    // get the fee information
    const { feeId, feeType, feeValue } = FeeConfigHelper.getRightFeeConfig(feeConfigData);

    const appliedFee = FeeConfigHelper.getAppliedFee(feeType, feeValue, amount);
    const chargeFee = FeeConfigHelper.getChargeAmount(BearsFee, amount, appliedFee);

    return {
      AppliedFeeID: feeId,
      AppliedFeeValue: appliedFee,
      ChargeAmount: chargeFee,
      SettlementAmount: chargeFee - appliedFee,
    };
  }

  /**
     * @description get billing configuration data from db
     * @param {string} currency - the currency in which the transaction was made
     * @param {string} currencyCountry - the currency of the country of transaction
     * @param {object} paymentEntity - the payment information
     * @returns {Array} array if the fee config
     */
  static async getFeeConfig(currency, currencyCountry, paymentEntity) {
    const {
      ID,
      Issuer, Brand, Number,
      SixID, Type, Country
    } = paymentEntity;

    // set filter data
    const queryData = {
      currency: FeeConfigHelper.generateData(currency),
      locale: FeeConfigHelper.generateData(FeeConfigHelper.getLocale(Country, currencyCountry)),
      feeEntity: FeeConfigHelper.generateData(Type),
      entityProperty: FeeConfigHelper.generateEntityData([
        ID, Issuer, SixID, Brand, Number
      ]),
    };

    // fetch data from the db layer and return it
    return FeeConfigRepository.findBy(queryData);
  }
}
export default FeeConfigService;
