import { Router, Request, Response } from 'express';
import { getUsers } from '../../application/use-cases/getUsers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const users = getUsers();
  res.json(users);
});

router.get('/error', () => {
  throw new Error('Simulated failure!');
});

export default router;
