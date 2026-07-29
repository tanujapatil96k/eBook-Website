import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`\n MongoDB database connected successfully! 🎉 DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection FAILED: ", error);
        process.exit(1); // एरर आली तर प्रोसेस बंद करण्यासाठी
    }
};

export default connectDB;