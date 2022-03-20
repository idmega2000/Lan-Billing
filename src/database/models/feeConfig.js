import mongoose from 'mongoose';

const FeeConfig = mongoose.model('FeeConfig', new mongoose.Schema({
  feeId: {
    type: String,
  },
  currency: {
    type: String,
  },
  locale: {
    type: String,
  },
  feeEntity: {
    type: String,
  },
  entityProperty: {
    type: String,
  },
  feeType: {
    type: String,
  },
  feeValue: {
    type: String,
  },
}));

export default FeeConfig;
