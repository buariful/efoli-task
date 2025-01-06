import express from "express";
import { UserController } from "./user.controller";
import catchAsync from "../../../utils/catchAsync";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation.schema";
import TokenMiddleware from "../../middlewares/tokenMiddleware";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/user/register",
  validateRequest(UserValidation.userRegistrationSchema),
  catchAsync(UserController.createUser)
);

router.post(
  "/user/login",
  validateRequest(UserValidation.userLoginSchema),
  catchAsync(UserController.userLogin)
);
router.get(
  "/user/get-all",
  TokenMiddleware([UserRole.ADMIN]),
  catchAsync(UserController.getAllUsers)
);

export const UserRoutes = router;
