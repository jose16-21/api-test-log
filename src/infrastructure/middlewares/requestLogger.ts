// import pinoHttp from 'pino-http';
// import { v4 as uuidv4 } from 'uuid';
// import logger from '../logger/logger';
// // import { BaseError, errorHandler, requestOrigin } from '@tigo/trace';

// const requestLogger = pinoHttp({
//   logger,
//   genReqId: (req) => req.headers['x-request-id'] as string || uuidv4(),
//   customLogLevel: (res, err) => {
//     if (res.statusCode >= 500 || err) return 'error';
//     if (res.statusCode >= 400) return 'warn';
//     return 'info';
//   },
//   serializers: {
//     req(req) {
//       return {
//         id: req.id,
//         method: req.method,
//         url: req.url,
//         // Agrega el cuerpo solo para POST/PUT y si existe
//         body: ['POST', 'PUT'].includes(req.method) ? req.body : undefined,
//         // Ejemplo: agrega usuario si está autenticado
//         user: req.user ? req.user.id : undefined
//       };
//     },
//     res(res) {
//       return {
//         statusCode: res.statusCode,
//         responseTime: res.responseTime // pino-http agrega responseTime automáticamente
//       };
//     }
//   }
// });

// export default requestLogger;