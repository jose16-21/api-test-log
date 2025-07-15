import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UserUseCases {
  constructor(private userRepo: UserRepository) {}

  async createUser(user: User): Promise<User> {
    return this.userRepo.create(user);
  }

  async getUser(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepo.update(user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepo.delete(id);
  }

  async listUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}