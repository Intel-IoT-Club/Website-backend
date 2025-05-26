const express = require('express');
const app = express();
const dotenv=require("dotenv").config()
const PORT = process.env.PORT || 3000;
const {connectDB}=require("./config/connectionDB")

// Middleware
app.use(express.json());


// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running');
});

connectDB()

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
