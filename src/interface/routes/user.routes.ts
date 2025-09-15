import { Router } from 'express';
import { createConnection } from '../../infrastructure/database/mysqlConnection';
import { UserRepositoryMySQL } from '../../infrastructure/repositories/UserRepositoryMySQL';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import { UserController } from '../controllers/UserController';

const router = Router();

let userController: UserController;

(async () => {
  const db = await createConnection();
  const userRepo = new UserRepositoryMySQL(db);
  const userUseCases = new UserUseCases(userRepo);
  userController = new UserController(userUseCases);
})();

router.post('/', (req, res, next) => userController.create(req, res, next));
router.get('/:id', (req, res) => userController.getById(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));
router.get('/', (req, res) => userController.list(req, res));

export default router;