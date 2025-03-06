import dotenv from "dotenv";
import path from "path";

// Load the .env file explicitly from the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import authRoutes from './routes/authRoutes';
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import logger from "morgan";


var app = express();

// Initialize the database
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

export default app;
