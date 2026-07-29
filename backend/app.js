import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes.js";
import authRoutes from "./routes/auth.routes.js"; 
import contactRoutes from "./routes/contact.route.js"; // ✅ वर व्यवस्थित इम्पोर्ट केले आहे

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes); 

// Contact Route माउंट केला 👍
app.use('/api/contact', contactRoutes); 

app.get("/", (req, res) => {
    res.send("Your Express app is ready!");
});

export default app;