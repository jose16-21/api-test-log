import { Router, Request, Response } from 'express';
import { createConnection } from '../../infrastructure/database/mysqlConnection';
import { UserRepositoryMySQL } from '../../infrastructure/repositories/UserRepositoryMySQL';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import { User } from '../../domain/entities/User';
import logger from '../../infrastructure/logger/logger';

const router = Router();

let userUseCases: UserUseCases;

(async () => {
  const db = await createConnection();
  const userRepo = new UserRepositoryMySQL(db);
  userUseCases = new UserUseCases(userRepo);
})();

router.post('/', async (req: Request, res: Response) => {
  logger.info({ body: req.body }, 'Intentando crear usuario');

  const user: User = {
    name: req.body.name,
    email: req.body.email
  };
  const created = await userUseCases.createUser(user);
  res.json(created);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await userUseCases.getUser(Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
  const user: User = {
    id: Number(req.params.id),
    name: req.body.name,
    email: req.body.email
  };
  const updated = await userUseCases.updateUser(user);
  res.json(updated);
});

router.delete('/:id', async (req: Request, res: Response) => {
  await userUseCases.deleteUser(Number(req.params.id));
  res.status(204).send();
});

router.get('/', async (req: Request, res: Response) => {
  const users = await userUseCases.listUsers();
  res.json(users);
});

export default router;