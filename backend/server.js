require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

// auth routes imports
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Connection failed", err.message);
    }
}

app.get("/", (req, res) => {
    res.send("Backend is running");
});

async function startServer() {
    await connectDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();