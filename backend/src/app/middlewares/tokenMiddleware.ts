import { NextFunction, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { PrismaClient, UserRole } from "@prisma/client";
import catchAsync from "../../utils/catchAsync";
import { AuthenticatedRequest } from "../modules/user/user.interface";

const prisma = new PrismaClient();

const TokenMiddleware = (roles: UserRole[]) => {
  return catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        // check if token exist
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Token expired or invalid"
          );
        }

        // verify token
        let tokenDecodedData = null;
        try {
          tokenDecodedData = jwt.verify(
            token,
            config.jwt_secret as string
          ) as JwtPayload;
        } catch {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized."
          );
        }

        // check if user exist
        const { email, id } = tokenDecodedData;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized."
          );
        }
        if (Number(user.id) !== Number(id)) {
          throw new AppError(httpStatus.BAD_REQUEST, "Invalid token.");
        }

        // check if user has the required role
        if (roles.length > 0 && !roles.includes(user.role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized."
          );
        }

        // attach user to request
        req.user = tokenDecodedData;

        next();
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            error.message || "Invalid token."
          );
        } else {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "An unknown error occurred."
          );
        }
      }
    }
  );
};

export default TokenMiddleware;
