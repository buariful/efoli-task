import { RequestHandler, Response } from "express";
import sendResponse from "../../../utils/sendResponse";
import { TicketServices } from "./ticket.service";
import { AuthenticatedRequest } from "../user/user.interface";
import httpStatus from "http-status";

const createTicket: RequestHandler = async (req, res) => {
  const result = await TicketServices.insertTicketIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Ticket created successfully",
    data: result,
  });
};

const getSingleTicket: RequestHandler = async (req, res) => {
  const request = req as AuthenticatedRequest;
  const result = await TicketServices.getSingleTicket(
    request?.user?.role,
    request?.user?.id,
    Number(req?.params?.id)
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Ticket found successfully",
    data: result,
  });
};

const getAllTickets: RequestHandler = async (req, res) => {
  const request = req as AuthenticatedRequest;
  const result = await TicketServices.getAllTicketsByRole(
    request?.user?.role,
    request?.user?.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tickets found successfully",
    data: result,
  });
};

const submitTicket: RequestHandler = async (req, res) => {
  const request = req as AuthenticatedRequest;
  const result = await TicketServices.submitTicket(
    Number(req?.params?.id),
    request?.user?.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tickets submitted successfully",
    data: result,
  });
};

const deleteTicket: RequestHandler = async (req, res) => {
  const request = req as AuthenticatedRequest;

  const result = await TicketServices.deleteTicket(
    Number(req?.params?.id),
    request?.user?.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tickets deleted successfully",
    data: result,
  });
};

const assignExecutiveToTicket = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { ticketId, executiveId } = req.body;
  await TicketServices.assignExecutive(ticketId, executiveId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tickets assigned successfully",
    data: null,
  });
};

export const TicketController = {
  createTicket,
  getSingleTicket,
  getAllTickets,
  submitTicket,
  deleteTicket,
  assignExecutiveToTicket,
};
