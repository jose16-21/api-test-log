import { NextFunction, Request, Response } from 'express';
import { UserUseCases } from '../../application/use-cases/UserUseCases';
import { User } from '../../domain/entities/User';
import logger from '../../infrastructure/logger/logger';
import { BaseError, ErrorCodes } from '@tigo/trace';

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
      next(new BaseError(ErrorCodes.DB_ERROR, 422));
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

  async list(req: Request, res: Response) {
    const users = await this.userUseCases.listUsers();
    res.json(users);
  }
}