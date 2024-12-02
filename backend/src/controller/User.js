import { handleErrorResponse, jwt, ResponseMessage, sendResponse, StatusCodes, User } from "../index.js";


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
        if (!users) {
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

export const userLogin = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email, isDelete: 0 });
        if (!user) {

            return sendResponse(
                res,
                StatusCodes.BAD_REQUEST,
                ResponseMessage.USER_NOT_EXISTS,
                []
            );
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        return sendResponse(
            res,
            StatusCodes.OK,
            ResponseMessage.LOGIN_SUCCESSFULLY,
            { token }
        );

    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, error);
    }
};

export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user_id, isDelete: 0 });
        if (!user) {
            return res.status(400).json({
                status: StatusCodes.BAD_REQUEST,
                message: ResponseMessage.USER_NOT_EXISTS,
                data: []
            });
        }
        return sendResponse(
            res,
            StatusCodes.OK,
            ResponseMessage.GET_SINGLE_USER,
            user
        );
    } catch (error) {
        return handleErrorResponse(res, error);
    }
};