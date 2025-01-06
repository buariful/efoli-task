import { PrismaClient, TicketStatus, User, UserRole } from "@prisma/client";
import { TCreateReply } from "./reply.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient({ log: ["query", "error"] });

const insertReplyIntoDB = async (
  payload: TCreateReply,
  user: Partial<User>
) => {
  const ticketId = payload.ticket_id;
  const userRole = user?.role;

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  // if ticket not found
  if (!ticket) {
    throw new AppError(httpStatus.BAD_REQUEST, "Ticket not found");
  }

  // if ticket is closed
  if ((ticket.status as TicketStatus) === TicketStatus.CLOSED) {
    throw new AppError(httpStatus.BAD_REQUEST, "Ticket is closed");
  }

  // checking if user is executive
  if (userRole === UserRole.EXECUTIVE) {
    if (ticket.executive_id !== user.id) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
  }

  const [reply] = await prisma.$transaction([
    prisma.reply.create({
      data: {
        ticket_id: payload.ticket_id,
        message: payload.message,
        user_id: user?.id as number,
      },
    }),

    prisma.ticket.update({
      where: {
        id: payload.ticket_id,
      },
      data: {
        status: TicketStatus.CLOSED,
      },
    }),
  ]);

  return reply?.id;
};

export const ReplyServices = {
  insertReplyIntoDB,
};
