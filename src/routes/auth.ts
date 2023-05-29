import express, { Router } from 'express';

import { getUsers, login, register, updateUser, deleteUser } from '@controllers/auth';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/users').get(getUsers);
router.route('/users/:id').put(updateUser).delete(deleteUser);

export default router;
