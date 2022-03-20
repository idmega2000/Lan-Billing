export const feeConfigData = [
  {
    feeId: 'LNPY1221',
    currency: 'NGN',
    locale: '*',
    feeEntity: '*',
    entityProperty: '*',
    feeType: 'PERC',
    feeValue: '1.4',
  },

  {
    feeId: 'LNPY1223',
    currency: 'NGN',
    locale: 'LOCL',
    feeEntity: '*',
    entityProperty: 'CREDIT-CARD',
    feeType: 'FLAT_PERC',
    feeValue: '50:1.4',
  },

  {
    feeId: 'LNPY1222',
    currency: 'NGN',
    locale: 'INTL',
    feeEntity: 'VISA',
    entityProperty: 'CREDIT-CARD',
    feeType: 'PERC',
    feeValue: '5.0',
  },

  {
    feeId: 'LNPY1224',
    currency: 'NGN',
    locale: '*',
    feeEntity: '*',
    entityProperty: 'BANK-ACCOUNT',
    feeType: 'FLAT',
    feeValue: '100',
  },
  {
    feeId: 'LNPY1225',
    currency: 'NGN',
    locale: '*',
    feeEntity: 'MTN',
    entityProperty: 'USSD',
    feeType: 'PERC',
    feeValue: '0.55',
  },
];

export const feeConfSpec = {
  FeeConfigurationSpec: 'LNPY1221 NGN * *(*) : APPLY PERC 1.4\nLNPY1222 NGN INTL CREDIT-CARD(VISA) : APPLY PERC 5.0\nLNPY1223 NGN LOCL CREDIT-CARD(*) : APPLY FLAT_PERC 50:1.4\nLNPY1224 NGN * BANK-ACCOUNT(*) : APPLY FLAT 100\nLNPY1225 NGN * USSD(MTN) : APPLY PERC 0.55'
};

export const transactionData = {
  ID: 91204,
  Amount: 3500,
  Currency: 'NGN',
  CurrencyCountry: 'NG',
  Customer: {
    ID: 4211232,
    EmailAddress: 'anonimized292200@anon.io',
    FullName: 'Wenthorth Scoffield',
    BearsFee: false
  },
  PaymentEntity: {
    ID: 2203454,
    Issuer: 'AIRTEL',
    Brand: '',
    Number: '080234******2903',
    SixID: '080234',
    Type: 'USSD',
    Country: 'NG'
  }
};
