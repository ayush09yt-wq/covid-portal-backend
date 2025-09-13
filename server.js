const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://ayush09yt_db_user:Ayush1826@cluster0.gchlpxf.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// Example User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

// Register route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.send("User registered!");
});

// Login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.send("Login successful!");
    } else {
        res.send("Invalid username or password");
    }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
