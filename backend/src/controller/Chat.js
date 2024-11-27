import { handleErrorResponse, ResponseMessage, sendResponse, StatusCodes, Chat } from "../index.js";

export const getChatHistory = async (req, res) => {
  try {
    const { roomId } = req.params;
    const chatHistory = await Chat.find({
      $or: [
        { room: roomId}
      ]
    }).sort({ timestamp: 1 });

    return sendResponse(
      res,
      StatusCodes.OK,
      ResponseMessage.CHAT_HISTORY_FETCHED,
      chatHistory
    );
  } catch (error) {
    return handleErrorResponse(res, error);
  }
};

