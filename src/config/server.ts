import express from 'express';
import userRoutes from '../interface/routes/user.routes';
import externalRoutes from '../interface/routes/external.routes';
import requestLogger from '../infrastructure/middlewares/requestLogger';
import { errorHandler } from '../infrastructure/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/users', userRoutes);
app.use('/external', externalRoutes);
app.use(errorHandler);

export default app;
