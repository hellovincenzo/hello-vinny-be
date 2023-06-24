import express, { Router } from 'express';

import { createEmail } from '@controllers/emails';

import { protect } from '@middlewares/auth';

const router: Router = express.Router();

router.route('/').post(createEmail);

export default router;
