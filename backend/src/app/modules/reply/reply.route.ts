import express from "express";
import { ReplyController } from "./reply.controller";
import catchAsync from "../../../utils/catchAsync";
import validateRequest from "../../middlewares/validateRequest";
import TokenMiddleware from "../../middlewares/tokenMiddleware";
import { UserRole } from "@prisma/client";
import { ReplyValidationSchema } from "./reply.validation.schema";

const router = express.Router();

router.post(
  "/reply/create",
  TokenMiddleware([UserRole.EXECUTIVE, UserRole.ADMIN]),
  validateRequest(ReplyValidationSchema.replyCreateSchema),
  catchAsync(ReplyController.replyToATicket)
);

export const ReplyRouts = router;
