const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://spareisle:GxSnCrd0Kl16kWIT@cluster0.dhrdzij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Initialize express app
const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());


// Routes
const postRoutes = require("./routes/posts"); 
app.use("/api/posts", postRoutes);

const userRoutes = require('./routes/users'); // Adjust path as necessary
app.use('/api/users', userRoutes);

// Choose a port to listen on
const PORT = process.env.PORT || 5000;

// Starting the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
