import express from "express";
import { UserController } from "./user.controller";
import catchAsync from "../../../utils/catchAsync";
const router = express.Router();

router.post("/user/register", catchAsync(UserController.createUser));

export const UserRoutes = router;
