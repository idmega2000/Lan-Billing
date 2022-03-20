import FeeConfigController from 'controllers/FeeConfigController';
import { Router } from 'express';
import ServerResponses from 'utilities/ServerResponses';

const router = Router();

router.get('/', (req, res) => ServerResponses.response(
  res, { message: 'welcome to lan billing' }
));

// add billing config fee
router.post('/fees', FeeConfigController.addFeeConfig);

// compute transaction billing fee
router.post('/compute-transaction-fee', FeeConfigController.conputeBillingConfig);

export default router;
