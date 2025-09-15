# Logs Service (API Usuarios + Servicio Externo)

API REST con arquitectura limpia (Domain / Application / Infrastructure / Interface), logging estructurado (pino), manejo centralizado de errores y consumo de servicio externo.

## Arquitectura (Capas)

- domain: Entidades y contratos (reglas de negocio puras)
- application: Casos de uso (orquestación de negocio)
- infrastructure: Implementaciones técnicas (DB, logger, middlewares, repos)
- interface: Adaptadores de entrada/salida (HTTP: controllers + routes)
- config: Bootstrap de servidor

## Estructura de carpetas (principal)
```
src/
  domain/
  application/
  infrastructure/
    database/
    repositories/
    middlewares/
    logger/
  interface/
    controllers/
    routes/
  config/
```

## Requisitos
- Node.js >= 18
- MySQL
- npm o yarn

## Variables de entorno (.env ejemplo)
```
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DATABASE=logs_db
NODE_ENV=development
```

## Instalación
```sh
npm install
```

## Migraciones / DB (ejemplo rápido)
```sql
CREATE DATABASE logs_db;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Ejecutar
```sh
npm run dev      # desarrollo (nodemon)
npm start        # producción
```

## Logging
- requestLogger genera: id de request, método, URL, statusCode y nivel dinámico (info/warn/error).
- Puedes pasar tu propio X-Request-Id:
  ```sh
  curl -H "x-request-id: custom-req-id-001" http://localhost:3000/users
  ```

## Manejo de errores
- Los controllers usan try/catch y delegan con next(err).
- errorHandler centraliza la respuesta (formato consistente).
- Se pueden lanzar errores tipificados (BaseError, ErrorCodes).

## Endpoints Usuarios (CRUD)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | /users | Lista usuarios |
| GET    | /users/:id | Obtiene usuario |
| POST   | /users | Crea usuario |
| PUT    | /users/:id | Actualiza usuario |
| DELETE | /users/:id | Elimina usuario |

### Ejemplos cURL
```sh
# Listar
curl -X GET http://localhost:3000/users

# Crear
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Obtener por id
curl -X GET http://localhost:3000/users/1

# Actualizar
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.upd@example.com"}'

# Eliminar
curl -X DELETE http://localhost:3000/users/1
```

## Endpoint Servicio Externo
Consume JSONPlaceholder (posts).
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /external/post/:id | Obtiene post externo |

### Ejemplos
```sh
curl -X GET http://localhost:3000/external/post/1
curl -X GET http://localhost:3000/external/post/10
```

## Ejemplos con Request ID
```sh
curl -H "x-request-id: req-123" http://localhost:3000/external/post/2
```

## Respuesta de error (ejemplo)
```json
{
  "error": "Usuario no encontrado"
}
```

## Buenas prácticas aplicadas
- Separación de responsabilidades
- Inyección de dependencias (repos en casos de uso)
- Logs estructurados
- Request tracing (request id)
- Manejo uniforme de errores

## Próximas mejoras sugeridas
- Validación con Zod / Joi
- Paginación en /users
- Tests unitarios de casos de uso
- Cache para respuestas externas

## Licencia
MIT

