import { Router } from 'express';
import responsehelpers from '../../../helpers/responseHelpers';

const v1Router = Router();

const HOME = '/';

const API_V1 = '/api/v1';

v1Router.get(HOME, (req, res) => responsehelpers(
  res, 'Welcome to App Version one', '',
  200,
  'success',
));

v1Router.get(API_V1, (req, res) => responsehelpers(
  res, 'Welcome to App', { version: '1' },
  200,
  'success',
));

export default v1Router;
