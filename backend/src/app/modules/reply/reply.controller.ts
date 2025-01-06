import { User } from "@prisma/client";
import { AuthenticatedRequest } from "../user/user.interface";
import { ReplyServices } from "./reply.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { Response } from "express";

const replyToATicket = async (req: AuthenticatedRequest, res: Response) => {
  const result = await ReplyServices.insertReplyIntoDB(
    { ...req.body },
    req.user as Partial<User>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Reply created successfully",
    data: result,
  });
};

export const ReplyController = {
  replyToATicket,
};
