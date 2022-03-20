import mongoose from 'mongoose';

const FeeConfig = mongoose.model('FeeConfig', new mongoose.Schema({
  feeId: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  feeEntity: {
    type: String,
    required: true,
  },
  entityProperty: {
    type: String,
    required: true,
  },
  feeType: {
    type: String,
    required: true,
  },
  feeValue: {
    type: String,
    required: true,
  },
}));

export default FeeConfig;
