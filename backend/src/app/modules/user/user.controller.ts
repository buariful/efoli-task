import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";

const createUser: RequestHandler = async (req, res) => {
  const result = await UserServices.insertUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: {
      id: result?.data,
      token: result?.token,
    },
  });
};

export const UserController = {
  createUser,
};
