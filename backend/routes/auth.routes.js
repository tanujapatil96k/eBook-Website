import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// १. SIGN UP / REGISTER API
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // सर्व माहिती भरली आहे की नाही हे तपासणे
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill in all the required fields!" });
        }

        // ईमेल आधीच रजिस्टर आहे का ते तपासणे
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "This email is already registered!" });
        }

        // पासवर्ड सुरक्षित (Hash) करणे
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // नवीन युझर तयार करणे
        const newUser = new User({
            username,
            email,
            password: hashedPassword // डेटाबेसमध्ये ओरिजिनल पासवर्ड ऐवजी हॅश पासवर्ड जाईल
        });

        await newUser.save();
        res.status(201).json({ success: true, message: "Your account has been created successfully! 🎉" });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred during registration", error: error.message });
    }
});

// २. LOGIN API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter both your email and password!" });
        }

        // युझर शोधणे
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect email or password!" });
        }

        // पासवर्ड मॅच करून पाहणे
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password!" });
        }

        res.status(200).json({ 
            success: true, 
            message: "लॉगिन यशस्वी झाले! 🔓", 
            user: { id: user._id, username: user.username, email: user.email } 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while logging in", error: error.message });
    }
});


// LOGIN API
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter email and password!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password!" });
        }

        // 🎯 इथे तुमचा Admin ईमेल अचूक टाका (उदा. तुमचा ईमेल किंवा फोन नंबर असलेला ईमेल)
        // लक्षात ठेवा: लहान/मोठी अक्षरे किंवा space मधील फरक टाळण्यासाठी lowerCase वापरा
        const adminEmail = " admin@gmail.com ".trim().toLowerCase(); 
        
        let role = user.role;
        if (user.email.trim().toLowerCase() === adminEmail) {
            role = "admin";
        }

        res.status(200).json({ 
            success: true, 
            message: "लॉगिन यशस्वी झाले! 🔓", 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                role: role || "user" // ✅ इथे Role अचूक पाठवला जाईल
            } 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
});

export default router;