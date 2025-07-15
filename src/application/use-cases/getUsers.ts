import { User } from '../../domain/entities/User';

export function getUsers(): User[] {
  return [
    new User(1, 'Juan'),
    new User(2, 'Ana')
  ];
}
