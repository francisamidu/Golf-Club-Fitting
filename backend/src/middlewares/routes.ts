import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticate";

// Middleware for Admin routes
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Middleware for Consumer routes (also allows Admins)
export const consumerMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.user ||
    (req.user.role !== "consumer" && req.user.role !== "admin")
  ) {
    res
      .status(403)
      .json({ message: "Access denied: Consumers or Admins only" });
    return;
  }
  next();
};
