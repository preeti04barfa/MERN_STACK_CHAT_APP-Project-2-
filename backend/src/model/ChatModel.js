import { mongoose } from "../index.js";


const ChatMessageSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: false
        },
        // room: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Room",
        //     required: true
        // },
        message: {
            type: String,
            required: true
        },

        timestamp: { type: Date, default: Date.now },
    });


const Chat = mongoose.model("Chat", ChatMessageSchema);
export { Chat };