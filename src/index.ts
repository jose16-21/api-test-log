import app from './config/server';
import logger from './infrastructure/logger/logger'; // Importa el logger

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'local';

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}, environment: ${NODE_ENV}`);
});

app.use((req, res, next) => {
  logger.info('Incoming request', { method: req.method, url: req.url });
  next();
});

app.get('/health', (req, res) => {
  logger.info('Health check solicitado');
  res.json({ status: 'OK' });
});
