import pinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger/logger';

const requestLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id'] as string || uuidv4(),
  customLogLevel: (res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode
      };
    }
  }
});

export default requestLogger;
