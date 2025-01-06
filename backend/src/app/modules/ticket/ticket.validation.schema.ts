import { z } from "zod";

const ticketCreateSchema = z.object({
  body: z.object({
    subject: z.string(),
    description: z.string(),
    customer_id: z.number(),
  }),
});

const ticketAssignSchema = z.object({
  body: z.object({
    ticketId: z.number(),
    executiveId: z.number(),
  }),
});

export const TicketValidation = {
  ticketCreateSchema,
  ticketAssignSchema,
};
