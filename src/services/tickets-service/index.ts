import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { TicketStatus } from '@prisma/client';

async function getType() {
  const ticketTypes = await ticketRepository.findTypes();
  return ticketTypes
  
}

async function createTicket(userId: number, ticketTypeId: number) {
  const status: TicketStatus = 'RESERVED'
  
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  
  if (!enrollment) {    
    throw notFoundError();
  }

  const CreateTicketParams: {
    ticketTypeId: number,
    enrollmentId: number,
    status: TicketStatus,
  } = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status,
  }

  const ticket = await ticketRepository.createTicket(CreateTicketParams);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function getTicket(userId: number) {
    
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  
  if (!enrollment) {    
    throw notFoundError();
  } 

  const ticket = await ticketRepository.findTicket(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}


export type TicketType = {
  ticketTypeId: number;
};


const ticketsService = {
  getType,
  createTicket,
  getTicket,
};

export default ticketsService;