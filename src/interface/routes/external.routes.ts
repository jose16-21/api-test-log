import { Router } from 'express';
import { ExternalUseCases } from '../../application/use-cases/ExternaServiceUseCases';
import { ExternalService } from '../../application/services/ExternalService';
import { ExternalController } from '../controllers/ExternalController';

const router = Router();
const externalUseCases = new ExternalUseCases(new ExternalService());
const externalController = new ExternalController(externalUseCases);

router.get('/post/:id', (req, res, next) => externalController.getPost(req, res, next));
export default router;