import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    return res.json({message: 'All is fine.'})
})

// Routes
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.llaiw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

        app.listen(5000 || PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()

