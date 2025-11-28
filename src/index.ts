import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import SECRETS from "./lib/secret.js";
import middleware from "./middleware.js";
import auth from "./routes/auth.js";
import { formatErrorMessage } from "./utils/formatted-errors.js";
import product from "./routes/product.js";

const app = express();

// port
const PORT = SECRETS.PORT;

// root route
app.get("/", (_, res, next) => {
  res.json({
    success: true,
    message: "Welcome To The API",
  });

  next();
});

// implement middleware
app.use(middleware);

// define routes
app.use("/auth", auth);
app.use("/product", product);

// Handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

// Global Error Handler Middleware
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  // zod error catch
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: formatErrorMessage(err.message),
    });
  }

  // Determine status code
  const message = err.message || "Internal Server Error";

  res.status(500).json({
    success: false,
    message: message,
  });
});

// listen to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
