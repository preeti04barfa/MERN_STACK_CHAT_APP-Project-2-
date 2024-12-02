import { mongoose } from "../index.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    isDelete: {
        type:Boolean,
        default:false
    }
},
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export { User };