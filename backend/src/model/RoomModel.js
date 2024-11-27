import { mongoose } from "../index.js";

const RoomSchema = new mongoose.Schema({
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      }
    ],
    createdAt: { type: Date, default: Date.now },
  });
  
  const Room = mongoose.model("Room", RoomSchema);
  export { Room };
  

