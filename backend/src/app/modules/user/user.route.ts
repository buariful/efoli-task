import express from "express";
import { UserController } from "./user.controller";
import catchAsync from "../../../utils/catchAsync";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation.schema";
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

export const UserRoutes = router;
