export const RESPONSE_MESSAGE = {
  SOMETHING_WENT_WRONT: 'something went wrong, please try again',
  NOT_FOUND: 'route does not exist.',
  INVALID_JSON: 'invalid JSON payload passed.',
  OK: 'ok',
  NO_FEE_DATA: 'FeeConfigurationSpec is required.',
  NO_TRANSACTION_DATA: 'FeeConfigurationSpec is required.',
  NO_FEE_COMFIG_FOUND: 'No fee configuration found for this transaction.',
  INVALID_ENTITY_FEE: 'entity fee is invalid.',
};

export const LOCALE = {
  LOCL: 'LOCL',
  INTL: 'INTL'
};

export const FEE_TYPE = {
  FLAT: 'FLAT',
  PERC: 'PERC',
  FLAT_PERC: 'FLAT_PERC',
};

export const SUPPORTED_ENTITY_FEE = ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID', '*'];

export const PRECEDENCE_MARKER = '*';
