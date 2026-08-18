import ErrorHandler from "./ErrorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ============================
// Verify Authentication
// ============================
export const verifyUserAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("Token from cookies:", token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  // Verify Token
  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token. Please login again.", 401));
  }

  console.log("Decoded Data:", decodedData);

  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler("User no longer exists", 401));
  }

  next();
});

// ============================
// Role-Based Access Control (RBAC)
// ============================
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
