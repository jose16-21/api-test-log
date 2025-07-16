import mysql from 'mysql2/promise';

export const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db'
  });
};