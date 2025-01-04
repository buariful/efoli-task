import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import globalErrorMiddleware from "./app/middlewares/globalErrorMiddleware";
import notFound from "./app/middlewares/notFound";
import { AppRoute } from "./app/routes";
const app = express();

//parser
app.use(express.json());
app.use(cors());

// health check
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// application routes
app.use("/", AppRoute);

// middleware
app.use(globalErrorMiddleware);

// 404 route
app.use(notFound);

export default app;
