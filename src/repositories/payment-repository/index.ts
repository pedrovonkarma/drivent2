import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findTicket(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}

async function findTicketPrice(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

async function findEnrollment(enrollmentId: number) {
  return prisma.enrollment.findUnique({
    where: {
      id: enrollmentId,
    },
  });
}

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(payment: CreatePaymentParams) {
  const createdPayment = await prisma.payment.create({
    data: payment,
  });

  if (createdPayment) {
    await prisma.ticket.update({
      where: {
        id: payment.ticketId,
      },
      data: {
        status: 'PAID',
      },
    });
  }

  return createdPayment;
}

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  findTicket,
  findEnrollment,
  findPayment,
  createPayment,
  findTicketPrice,
};

export default paymentRepository;
