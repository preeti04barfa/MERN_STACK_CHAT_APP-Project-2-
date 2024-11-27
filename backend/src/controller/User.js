import { handleErrorResponse, ResponseMessage, sendResponse, StatusCodes, User } from "../index.js";

export const UserCreate = async (req, res) => {
    try {
        const { username, email } = req.body;
        const findEmail = await User.findOne({ email, isDelete: false });
        if (findEmail) {
            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                ResponseMessage.USER_ALREADY_EXIST,
                []
            );
        }
        const user = new User({ username, email });
        const addUser = await user.save();
        return sendResponse(
            res,
            StatusCodes.CREATED,
            ResponseMessage.USER_ADDED,
            addUser
        );
    } catch (error) {
        return handleErrorResponse(res, error);
    }
};

export const UserGet = async (req, res) => {
    try {
        const users = await User.find({isDelete:false});
        if (users) {
            return sendResponse(
                res,
                StatusCodes.NOT_FOUND,
                ResponseMessage.USER_NOT_EXISTS,
                []
            );
        }
        return sendResponse(
            res,
            StatusCodes.OK,
            ResponseMessage.GET_SINGLE_USER,
            users
        );
  
    } catch (error) {
        return handleErrorResponse(res, error);
    }
};