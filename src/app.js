import express from "express";
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { ORIGIN } from "./config.js"

import { pool } from "./db.js";

const app = express()

//MIDDLEWARE
app.use(cors({
    origin: ORIGIN,
    credentials: true
}))
app.enable('trust proxy')
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

//ROUTES
app.get('/', (req, res) => res.json({ message: "welcome to my API" }))
app.use('/api', taskRoutes)
app.use('/api', authRoutes)

app.use('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
})


//ERROR HANDLER

app.use((error, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: error.message
    })
})

export default app