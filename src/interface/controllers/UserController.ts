import { Request, Response, NextFunction } from 'express';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import logger from '../../infrastructure/logger/logger';
import { User } from '../../domain/entities/User';

export class UserController {
  constructor(private userUseCases: UserUseCases) { }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(`Creating user ${JSON.stringify(req.body)}`, { body: req.body });
      const user: User = {
        name: req.body.name,
        email: req.body.email
      };

      // llamo a la fuincion de crear usuario
      // llamo al paso 2 
      const created = await this.userUseCases.createUser(user);
      res.json(created);
    } catch (error) {
      logger.error('Error creating user', { error });
      next(error);
    }

  }

  async getById(req: Request, res: Response) {
    const user = await this.userUseCases.getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    const user: User = {
      id: Number(req.params.id),
      name: req.body.name,
      email: req.body.email
    };
    const updated = await this.userUseCases.updateUser(user);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await this.userUseCases.deleteUser(Number(req.params.id));
    res.status(204).send();
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userUseCases.listUsers();
      res.json(users);
    } catch (error) {
      // ERROR - Para errores críticos que afectan la funcionalidad
      logger.error('Error al crear usuario en la base de datos', { errorCode: 'DB_001', operation: 'createUser' }, { userId: req.body?.email, requestId: 'req-123' });

      // WARN - Para situaciones anómalas pero no críticas
      logger.warn('Usuario no encontrado en la base de datos', { userId: req.params.id, operation: 'getById' }, { endpoint: '/users/:id', method: 'GET' });

      // INFO - Para eventos importantes del flujo normal
      logger.info('Usuario creado exitosamente', { userId: 123, email: req.body.email }, { operation: 'createUser', duration: '250ms' });

      // DEBUG - Para información detallada de depuración
      logger.debug('Validando datos de entrada del usuario', { validationRules: ['email', 'name'], inputData: req.body }, { controller: 'UserController', method: 'create' });
      next(error);
    }
  }
}