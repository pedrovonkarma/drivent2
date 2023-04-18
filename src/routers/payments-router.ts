import { Router } from 'express';
import { getPayment, createPayment } from '@/controllers';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { ticketIdSchema, paymentSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), getPayment)
  .post('/process', validateBody(paymentSchema), createPayment);

export { paymentsRouter };
