import express, { Router } from 'express';

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  projectPhotoUpload,
} from '@controllers/projects';

import { protect } from '@middlewares/auth';

const router: Router = express.Router();

router.route('/').get(getProjects).post(protect, createProject);

router.route('/:id').get(getProject).put(protect, updateProject).delete(protect, deleteProject);

router.route('/:id/photo').put(projectPhotoUpload);

export default router;
