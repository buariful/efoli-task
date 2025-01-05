import { z } from "zod";

const ticketCreateSchema = z.object({
  body: z.object({
    subject: z.string(),
    description: z.string(),
    customer_id: z.number(),
  }),
});

export const TicketValidation = {
  ticketCreateSchema,
};
