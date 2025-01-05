import { z } from "zod";

const userRegistrationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    first_name: z.string().min(3),
    last_name: z.string().optional(),
    password: z
      .string({
        message: "Password must be at least 6 characters",
        required_error: "Password must be at least 6 characters",
      })
      .min(6, "Password must be at least 6 characters"),
    role: z.string().optional(),
  }),
});

export const UserValidation = {
  userRegistrationSchema,
};
