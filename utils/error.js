import ErrorHandler from "./ErrorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //cast error handling for mongoose bad ObjectId
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message);
    err.statusCode = 400;
  }

  if (err.code===11000){
  const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  err = new ErrorHandler(message);
  err.statusCode = 400;
  } 

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
