import { dotenv, jwt, ResponseMessage, StatusCodes } from "../index.js";

export const auth = async function (req, res, next) {
    const token = req.header("auth");
    if (!token) {
        return res.status(401).json({
            status: StatusCodes.UNAUTHORIZED,
            message: ResponseMessage.TOKEN_NOT_AUTHORIZED,
            data: [],
        });
    } else {
        try {
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            req.user_id = decode.userId;
            next();
        } catch (error) {
            return res.status(401).json({
                status: StatusCodes.UNAUTHORIZED,
                message: ResponseMessage.TOKEN_NOT_VALID,
                data: error,
            });
        }
    }
};

export default auth;
