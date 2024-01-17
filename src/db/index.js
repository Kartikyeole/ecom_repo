import mongoose from 'mongoose';
import { DB_NAME } from '../constants';



const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
    } catch (error) {
        console.log("Error connecting to DB : " , error);
        throw error;
    }
}