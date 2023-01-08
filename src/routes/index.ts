import { type Express } from 'express';
import { indexRoute } from '../controllers/HomeController';

export default function RoutesRegister(app: Express) {
  app.get('/', indexRoute);
  app.get('/health', indexRoute);
}
