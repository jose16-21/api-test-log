-- Crea la base de datos
CREATE DATABASE IF NOT EXISTS db;
USE db;

-- Crea la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);