import express from "express";
import { UserRoutes } from "../modules/user/user.route";
const router = express.Router();

const moduleRoutes = [UserRoutes];

moduleRoutes.forEach((route) => {
  router.use("/api/v1", route);
});

export const AppRoute = router;
