import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Connection } from 'mysql2/promise';
import logger from '../logger/logger';
export class UserRepositoryMySQL implements UserRepository {
  constructor(private db: Connection) { }

  async create(user: User): Promise<User> {
    try {
      const [result]: any = await this.db.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [user.name, user.email]
      );
      return { id: result.insertId, name: user.name, email: user.email };
    } catch (error) {
      logger.error('Error al crear usuario', { error }, error);
      throw new Error('Error al crear usuario');
    }
  }

  async findById(id: number): Promise<User | null> {
    const [rows]: any = await this.db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email
    };
  }

  async update(user: User): Promise<User> {
    await this.db.execute('UPDATE users SET name = ? WHERE id = ?', [user.name, user.id]);
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.db.execute('DELETE FROM users WHERE id = ?', [id]);
  }

  async findAll(): Promise<User[]> {
    try {
    const [rows]: any = await this.db.execute('SELECT * FROM users');
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email
      }));
    } catch (error) {
      logger.error('Error al obtener todos los usuarios 1', { error }, error);
      throw new Error('Error al obtener todos los usuarios 2');
    }
  }
}