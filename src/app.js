import express, { urlencoded } from "express";
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => res.json({ message: "welcome to my API" }))

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