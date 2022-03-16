import { Router } from 'express';

// v1 Routes
import v1Router from './api/v1';

const router = Router();
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome to app' });
});
router.use(v1Router);

export default router;
