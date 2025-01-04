import express, { Request, Response } from "express";
const router = express.Router();

router.get("/v1/checking", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User route is working",
  });
});
export const UserRoutes = router;
