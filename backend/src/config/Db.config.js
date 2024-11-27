import { mongoose } from "../index.js";

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chatApplication');
        console.log('Database Connected')
    } catch (error) {
        console.log('Database error',error)
    }
}

export { dbConnection }