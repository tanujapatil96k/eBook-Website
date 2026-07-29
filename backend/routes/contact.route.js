import express from "express";
import Contact from "../models/Contact.js"; // १. मॉडेल योग्य प्रकारे इम्पोर्ट केले

const router = express.Router();

// Contact Form चा डेटा सेव्ह करण्यासाठी POST API
// URL: http://localhost:5000/api/contact/submit
router.post('/submit', async (req, res) => {
    try {
        const { firstname, lastname, country, subject } = req.body;

        // व्हॅलिडेशन
        if (!firstname || !lastname || !subject) {
            return res.status(400).json({ success: false, message: "Please fill in all the required fields!" });
        }

        // डेटाबेसमध्ये नवीन मेसेज सेव्ह करणे
        const newMessage = new Contact({ firstname, lastname, country, subject });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Your message has been sent successfully! 🚀" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "A server error has occurred." });
    }
});

export default router;