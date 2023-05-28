import express, { Router } from 'express';

import { getProjects, getProject, createProject, updateProject, deleteProject } from '@controllers/projects';

const router: Router = express.Router();

router.route('/').get(getProjects).post(createProject);

router.route('/:id').get(getProject).put(updateProject).delete(deleteProject);

export default router;
