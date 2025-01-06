import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

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

const userLogin: RequestHandler = async (req, res) => {
  const result = await UserServices.userLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login success",
    data: result,
  });
};

const getAllUsers: RequestHandler = async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users found successfully",
    data: result,
  });
};

export const UserController = {
  createUser,
  userLogin,
  getAllUsers,
};
