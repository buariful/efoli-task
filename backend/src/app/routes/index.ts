import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { TicketRoute } from "../modules/ticket/ticket.route";
const router = express.Router();

const moduleRoutes = [UserRoutes, TicketRoute];

moduleRoutes.forEach((route) => {
  router.use("/api/v1", route);
});

export const AppRoute = router;
