import { Router, Request, Response } from 'express';
import { ExternalUseCases } from '../../application/use-cases/ExternaServiceUseCases';
import { ExternalService } from '../../application/services/ExternalService';

const router = Router();
const externalUseCases = new ExternalUseCases(new ExternalService());

router.get('/post/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const data = await externalUseCases.fetchPost(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al llamar al servicio externo' });
  }
});

export default router;