import {ResponseMessage, StatusCodes } from "../index.js";

export const handleErrorResponse = async (res, error) => {
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  };
  
  export const sendResponse = async (res, status, message, data) => {
    return res.status(status).json({ status, message, data });
  };