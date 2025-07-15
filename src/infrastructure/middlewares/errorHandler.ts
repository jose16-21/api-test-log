import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({ err, reqId: (req as any).id }, 'Unhandled error');
  res.status(500).json({
    message: 'Internal Server Error',
    requestId: (req as any).id
  });
}
