import express from 'express';
import { corsMiddleware } from '@middlewares/cors';
import { requestLogger } from '@middlewares/logger';
import { jsonParser } from '@middlewares/parser';
import RoutesRegister from '@routes/index';

const app = express();

app.use(requestLogger);
app.use(corsMiddleware);
app.options('*', corsMiddleware);
app.use(jsonParser);

RoutesRegister(app);

export default app;
