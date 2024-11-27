import { mongoose } from "../index.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
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