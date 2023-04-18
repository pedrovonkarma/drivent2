import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await ticketsService.getType();
      res.status(httpStatus.OK).send(types);
    } catch (error) {
      next(error);
    }
  }

  export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req as { userId: number };
    const { ticketTypeId } = req.body as { ticketTypeId: number };
    try {
      const ticket = await ticketsService.createTicket(userId, ticketTypeId);
      return res.status(httpStatus.CREATED).send(ticket);
    } catch (error) {
      if (error.name === 'NotFoundError') {      
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  export async function getTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req as { userId: number };
    
    try {
      const ticketTypes = await ticketsService.getTicket(userId);
  
      return res.status(httpStatus.OK).send(ticketTypes);
    } catch (error) {
      if (error.name === 'NotFoundError') {      
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
