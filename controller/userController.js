import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utils/JWT.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";




// ============================
// Register User
// ============================
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample_id",
      url: "sample_image_url",
    },
  });

  sendToken(user, 201, res);
});

// ============================
// Update User Role
// ============================
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {

  const {role}=req.body
  const newUserData = {
    role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User role updated to admin successfully",
    user,
  });
});

// ============================
// Login User
// ============================
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// ============================
// Logout User
// ============================
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  // 1. Find user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 2. Get reset token (from model method)
  let resetToken;
  try {
    resetToken = user.getResetPasswordToken();

    // Save hashed token in DB
    await user.save({ validateBeforeSave: false });

    console.log("Generated Reset Token:", resetToken);
  } catch (error) {
    return next(new ErrorHandler("Error generating reset token", 500 , error));
  }

// Create Reset URL (no async needed)
const resetPasswordUrl = `${req.protocol}://${req.get(
  "host"
)}/api/v1/password/reset/${resetToken}`;

console.log("Reset URL:", resetPasswordUrl);

// Email message
const message = `Use the following link to reset your password:\n\n${resetPasswordUrl}\n\nIf you didn't request this, ignore it.`;

// Send email
try {
  await sendEmail({
    email: user.email,
    subject: "Password Recovery",
    message,
  });

  res.status(200).json({
    success: true,
    message: `Password reset link sent to ${user.email}`,
  });

} catch (error) {
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return next(new ErrorHandler("Email send failed", 500));
}
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.token)
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
if (!user) {
  return next(
    new ErrorHandler(
      "Password reset token is invalid or has expired",
      400
    )
  );
}
const {password,confirmPassword}=req.body
if (password !== confirmPassword) {
  return next(new ErrorHandler("Passwords do not match", 400));
}
user.password=password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save();
sendToken(user, 200, res);
});

export const getUserDetails = catchAsyncErrors(async (req, res, next)=>{
  const user = await User.findById(req.user.id);
  console.log(user)

  res.status(200).json({
    success: true,
    user,
  });

})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const {oldPassword,newPassword,confirmPassword}=req.body
    const user = await User.findById(req.user.id).select("+password");
    const checkPassword = await user.comparePassword(oldPassword);

    if (!checkPassword) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }
    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res);
})

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user=await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });

})

export const getUserList=catchAsyncErrors(async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success: true,
    users,
  });
})

export const getSingleUser=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
})

export const deleteUser=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
})

