import express, { Router } from 'express';

import { getFeatures, getFeature, createFeature, updateFeature, deleteFeature } from '@controllers/feature';

import { protect } from '@middlewares/auth';

const router: Router = express.Router();

router.route('/').get(getFeatures).post(protect, createFeature);

router.route('/:id').get(getFeature).put(protect, updateFeature).delete(protect, deleteFeature);

export default router;
