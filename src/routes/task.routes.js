import Router from "express-promise-router"
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js"
import { isAuth } from "../middlewares/auth.middleware.js"
import { validateSchema } from "../middlewares/validate.middleware.js"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js"

const router = Router()

router.get('/tasks', isAuth, getTasks)
router.get('/tasks/:id', isAuth, getTask)
router.post('/tasks', isAuth, validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', isAuth, deleteTask)
router.put('/tasks/:id', isAuth, validateSchema(updateTaskSchema), updateTask)

export default router