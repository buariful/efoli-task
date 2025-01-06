import { z } from "zod";

export const replyCreateSchema = z.object({
  body: z.object({
    ticket_id: z.number(),
    message: z.string(),
  }),
});

export const ReplyValidationSchema = {
  replyCreateSchema,
};
