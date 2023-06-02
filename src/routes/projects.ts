import express, { Router } from 'express';

import { getProjects, getProject, createProject, updateProject, deleteProject } from '@controllers/projects';

import { protect } from '@middlewares/auth';

const router: Router = express.Router();

router.route('/').get(getProjects).post(createProject);

router.route('/:id').get(getProject).put(protect, updateProject).delete(protect, deleteProject);

export default router;
