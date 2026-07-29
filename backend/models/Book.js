import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // इथे इमेजची URL/लिंक असेल
    description: { type: String }
}, { timestamps: true }); // याने पुस्तक कधी ॲड केलं त्याची वेळ आपोआप सेव्ह होईल

const Book = mongoose.model("Book", bookSchema);
export default Book;