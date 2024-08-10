import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import disasterRoutes from './routes/disasterRoutes.js';
import materialRoutes from './routes/materialRoutes.js'
import postRoutes from './routes/postRoutes.js'


dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(201).json("Server Running");
});

app.use('/user', authRoutes);
app.use('/dis',disasterRoutes);
app.use('/mat',materialRoutes);
app.use('/posts', postRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })