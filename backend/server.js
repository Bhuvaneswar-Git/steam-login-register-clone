const express = require('express');
const cors = require('cors');
const app = express();

// Import config and routes
const {PORT, connectDB} = require('./config/config');
const authRouter = require('./routers/authRouter')

//Middleware
app.use(express.json()) // Parse JSON bodies
app.use(cors())

// Routes
app.use('/api/auth', authRouter)

// connect to MongoDB
connectDB().then(()=>{
    app.listen( PORT,()=> {
        console.log(`Server is running on Port:${PORT}`)
    });
}).catch((err)=>{
    console.error('❌ Failed to connect to MongoDB:', err.message);
})
