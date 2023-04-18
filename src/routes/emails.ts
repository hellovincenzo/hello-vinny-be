import { sendMail } from '../controllers/email';
import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ success: true });
});

router.get('/:id', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, msg: `Getting email: ${req.params.id} ` });
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  await sendMail(req, res);
});

router.delete('/:id', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, msg: `Email: ${req.params.id} has been deleted` });
});

export default router;
