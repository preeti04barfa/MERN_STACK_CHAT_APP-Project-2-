import { mongoose } from "../index.js";

const RoomSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
      ref: "User",
    }
  ],
  groupChat: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", RoomSchema);
export { Room };


