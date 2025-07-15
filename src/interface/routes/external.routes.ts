import { Router, Request, Response, NextFunction } from 'express';
import { callExternalApi } from '../../application/services/externalApiService';
import logger from '../../infrastructure/logger/logger';

const router = Router();

router.get('/:code', async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params;

  try {
    const result = await callExternalApi(code);
    res.json(result);
  } catch (err: any) {
    const statusCode = err?.status || err?.response?.status || 500;
    const message = err?.message || err?.response?.statusText || 'Internal Server Error';

    logger.error(
      {
        reqId: (req as any).id,
        status: statusCode,
        message: message
      },
      'External API call failed'
    );

    res.status(statusCode).json({
      error: message,
      code: statusCode,
      requestId: (req as any).id
    });
  }
});

export default router;
