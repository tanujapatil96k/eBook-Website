import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // दोन युझर्सचे नाव सारखे असू शकत नाही
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // एक ईमेल फक्त एकदाच रजिस्टर होईल
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // यामुळे युझरने कधी अकाउंट बनवलं ती वेळ आपोआप सेव्ह होईल

const User = mongoose.model("User", userSchema);
export default User;