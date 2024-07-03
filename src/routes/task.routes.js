import { Router } from "express"

const router = Router()

router.get('/tasks', (req, res) => res.send('obteniendo tareas...'))
router.get('/tasks/:id', (req, res) => res.send('obteniendo tarea unica...'))
router.post('/tasks', (req, res) => res.send('creando tarea...'))
router.delete('/tasks/:id', (req, res) => res.send('borrando tarea...'))
router.put('/tasks/:id', (req, res) => res.send('actualizando tareas...'))

export default router