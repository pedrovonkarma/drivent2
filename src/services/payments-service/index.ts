import paymentRepository from '@/repositories/payment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

async function getTicketById(ticketId: number, userId: number) {
  const ticket = await paymentRepository.findTicket(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await paymentRepository.findEnrollment(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.findPayment(ticketId);

  return payment;
}

async function createPayment(params: PaymentReq) {
  const ticket = await paymentRepository.findTicket(params.ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const value = await paymentRepository.findTicketPrice(ticket.ticketTypeId);

  if (!value) {
    throw notFoundError();
  }

  const enrollment = await paymentRepository.findEnrollment(ticket.enrollmentId);

  if (enrollment.userId !== params.userId) {
    throw unauthorizedError();
  }

  const CreatePaymentParams: {
    ticketId: number;
    value: number;
    cardIssuer: string;
    cardLastDigits: string;
  } = {
    ticketId: params.ticketId,
    value: value.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: params.cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(CreatePaymentParams);

  return payment;
}

export type TicketId = {
  ticketId: number;
};

export type PaymentReq = {
  userId: number;
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

const paymentsService = {
  getTicketById,
  createPayment,
};

export default paymentsService;
