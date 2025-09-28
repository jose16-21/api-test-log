import { Request, Response, NextFunction } from 'express';
import { ExternalUseCases } from '../../application/use-cases/ExternaServiceUseCases';
import logger from '../../infrastructure/logger/logger';
export class ExternalController {
    constructor(private externalUseCases: ExternalUseCases) { }

    async getPost(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        try {
            const data = await this.externalUseCases.fetchPost(id);
            res.json(data);
        } catch (err) {
            logger.error('Error fetching post:', { error: err }, err);
            // next(new BaseError(ErrorCodes.DB_ERROR, 500));
        }
    }
}