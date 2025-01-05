import { PrismaClient, TicketStatus, UserRole } from "@prisma/client";
import { TTicketCreate } from "./ticket.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
const prisma = new PrismaClient();

const isTicketExists = async (ticketId: number) => {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
};

// get all tickets
const getAllTicketsByRole = async (role: UserRole, userId: number) => {
  let payload = {};
  if (role === UserRole.CUSTOMER) {
    payload = {
      customer_id: userId,
    };
  } else if (role === UserRole.EXECUTIVE) {
    payload = {
      executive_id: userId,
    };
  }

  const tickets = await prisma.ticket.findMany({
    where: payload,
  });

  return tickets;
};

// get single ticket
const getSingleTicket = async (
  role: UserRole,
  userId: number,
  ticketId: number
) => {
  const payload: { id: number; customer_id?: number; executive_id?: number } = {
    id: ticketId,
  };

  if (role === UserRole.CUSTOMER) {
    payload["customer_id"] = userId;
  } else if (role === UserRole.EXECUTIVE) {
    payload["executive_id"] = userId;
  }

  const tickets = await prisma.ticket.findUnique({
    where: payload,
  });

  if (!tickets) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  return tickets;
};

// create ticket
const insertTicketIntoDB = async (ticketData: TTicketCreate) => {
  const result = await prisma.ticket.create({
    data: ticketData,
  });

  return result?.id;
};

// checking ticket creator
const checkingTicketCreator = async (ticketId: number, userId: number) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  // check if ticket exists
  if (!ticket) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  // checking ticket creator
  if (Number(ticket.customer_id) !== Number(userId)) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
};

// submit ticket
const submitTicket = async (ticketId: number, userId: number) => {
  // check if ticket exists
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
  if (!ticket) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  // checking ticket creator
  await checkingTicketCreator(ticketId, userId);

  // submit ticket
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "SUBMITTED",
    },
  });

  return null;
};

// delete ticket
const deleteTicket = async (ticketId: number, userId: number) => {
  // check if ticket exists
  const ticket = await isTicketExists(ticketId);
  if (!ticket) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  // checking ticket creator
  await checkingTicketCreator(ticketId, userId);

  // submit ticket
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  return null;
};

const assignExecutive = async (ticketId: number, executiveId: number) => {
  const ticket = await isTicketExists(ticketId);
  if (!ticket) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      executive_id: executiveId,
      status: TicketStatus.ASSIGNED,
    },
  });
};

export const TicketServices = {
  getAllTicketsByRole,
  getSingleTicket,
  insertTicketIntoDB,
  submitTicket,
  deleteTicket,
  assignExecutive,
};
