import express, { urlencoded } from "express";
import morgan from "morgan"
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

//MIDDLEWARE
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: false }))

//ROUTES
app.get('/', (req, res) => res.json({ message: "welcome to my API" }))
app.use('/api', taskRoutes)
app.use('/api', authRoutes)


//ERROR HANDLER
app.get('/test', (req, res) => {
    throw new Error('Error de conexión')
    res.send('test')
})

app.use((error, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: error.message
    })
})

export default app