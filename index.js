const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = 3000;

dotenv.config();

// Import Routes
const authRoute = require("./routes/auth");

// connect to database
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log("Connected to DB");
});

// Middlewares
app.use(express.json());

app.get('/',(req, res)=>{
    res.send("Hello World");
});

// Route Middlewares
app.use('/api/user',authRoute);

app.listen(port,()=>{
    console.log(`App will start on localhost:${port}`);
});