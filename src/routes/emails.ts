import express, { Router } from 'express';

import { createEmail, sendMail } from '@controllers/emails';

import { protect } from '@middlewares/auth';

const router: Router = express.Router();

router.route('/').post(createEmail);
router.route('/send-email').post(sendMail);

export default router;
