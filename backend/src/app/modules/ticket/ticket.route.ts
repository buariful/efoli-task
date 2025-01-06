import express from "express";
import TokenMiddleware from "../../middlewares/tokenMiddleware";
import { TicketController } from "./ticket.controller";
import { UserRole } from "@prisma/client";
import catchAsync from "../../../utils/catchAsync";
import validateRequest from "../../middlewares/validateRequest";
import { TicketValidation } from "./ticket.validation.schema";
const router = express.Router();

router.get(
  "/ticket/get-all",
  TokenMiddleware([]),
  catchAsync(TicketController.getAllTickets)
);
router.get(
  "/ticket/get-one/:id",
  TokenMiddleware([]),
  catchAsync(TicketController.getSingleTicket)
);
router.post(
  "/ticket/create",
  TokenMiddleware([UserRole.CUSTOMER]),
  validateRequest(TicketValidation.ticketCreateSchema),
  catchAsync(TicketController.createTicket)
);
router.put(
  "/ticket/submit/:id",
  TokenMiddleware([UserRole.CUSTOMER]),
  catchAsync(TicketController.submitTicket)
);
router.delete(
  "/ticket/delete/:id",
  TokenMiddleware([UserRole.CUSTOMER]),
  catchAsync(TicketController.deleteTicket)
);
router.put(
  "/ticket/assign-executive",
  TokenMiddleware([UserRole.ADMIN]),
  validateRequest(TicketValidation.ticketAssignSchema),
  catchAsync(TicketController.assignExecutiveToTicket)
);

export const TicketRoute = router;
