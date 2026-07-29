import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// १. नवीन पुस्तक ॲड करण्यासाठी (POST Route)
router.post("/add", async (req, res) => {
    try {
        const { title, author, price, image, description } = req.body;

        // नवीन पुस्तक तयार करणे
        const newBook = new Book({ title, author, price, image, description });
        
        // डेटाबेसमध्ये सेव्ह करणे
        await newBook.save();
        
        res.status(201).json({ success: true, message: "The book has been added successfully!", book: newBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding the book", error: error.message });
    }
});

// २. सर्व पुस्तके मिळवण्यासाठी (GET Route)
router.get("/all", async (req, res) => {
    try {
        const books = await Book.find(); // डेटाबेसमधून सर्व पुस्तके शोधणे
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching the books", error: error.message });
    }
});

export default router;