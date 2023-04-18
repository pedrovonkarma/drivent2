import { Router } from 'express';
import { getTypes, getTicket, createTicket } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTypes)
  .get('/', getTicket)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
