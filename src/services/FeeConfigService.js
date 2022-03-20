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
      throw new APIException(RESPONSE_MESSAGE.NO_DATA);
    }

    const configData = feeConfigurationSpec.split(/\n+/).map((feeConfig) => {
      const splittedData = feeConfig.split(/\s+:\s+/);
      const [feeId, currency, locale, entity] = splittedData[0].split(/\s+/);
      const [_, feeType, feeValue] = splittedData[1].split(/\s+/);
      const indexOfCurlyStart = entity.indexOf('(');
      const feeEntity = entity.substring(indexOfCurlyStart + 1, entity.indexOf(')'));
      return {
        feeId,
        currency,
        locale,
        feeEntity,
        entityProperty: entity.substring(0, indexOfCurlyStart),
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
    if (!transactionData) {
      throw new APIException(RESPONSE_MESSAGE.NO_DATA);
    }
    const {
      Currency, CurrencyCountry, Amount,
      Customer: { BearsFee }, PaymentEntity
    } = transactionData;

    const amount = FeeConfigHelper.getNumber(Amount);

    const feeConfigData = await FeeConfigService
      .getFeeConfig(Currency, CurrencyCountry, PaymentEntity);

    const { feeId, feeType, feeValue } = FeeConfigHelper.getRightFeeConfig(feeConfigData);

    const appliedFeeValue = FeeConfigHelper.getAppliedFee(feeType, feeValue, amount);
    const chargeAmount = FeeConfigHelper.getChargeAmount(BearsFee, amount, appliedFeeValue);

    return {
      AppliedFeeID: feeId,
      AppliedFeeValue: appliedFeeValue,
      ChargeAmount: chargeAmount,
      SettlementAmount: chargeAmount - appliedFeeValue,
    };
  }

  /**
     * @description get billing configuration data
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

    // fetch data from the db layer
    const configData = await FeeConfigRepository.findBy(queryData);

    if (!configData.length) {
      throw new APIException(RESPONSE_MESSAGE.NO_FEE_COMFIG_FOUND);
    }

    return configData;
  }
}
export default FeeConfigService;
