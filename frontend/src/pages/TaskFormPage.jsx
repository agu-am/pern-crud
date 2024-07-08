import { Button, Card, Input, Label, TextArea } from "../components/ui"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useTask } from "../context/TaskContext"

function TaskFormPage() {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const { createTask, updateTask, loadTask, errors: tasksErrors } = useTask()

  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    let task;
    if (!params.id) {
      task = await createTask(data)
      navigate('/tasks')
    } else {
      task = await updateTask(params.id, data)
      if (task) {
        navigate('/tasks')
      }
    }
  })

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then(task => {
        setValue('title', task.title)
        setValue('description', task.description)
      })
    }
  }, [])

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        <h2 className="text-3xl font-bold my4">{params.id ? 'Editar Tarea' : 'Crear Tarea'}</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="title">Titulo</Label>
          <Input type="text" placeholder="Titulo" autoFocus
            {
            ...register("title", {
              required: true
            })
            }
          />
          {
            tasksErrors && tasksErrors.map((error, i) => <p className="text-red-500" key={i}>{error}</p>)
          }
          {errors.title && <p className="text-red-500">El titulo es requerido</p>}
          <Label htmlFor="description">Descripoción</Label>
          <TextArea placeholder="Descripción" rows={3}
            {
            ...register("description")
            }
          ></TextArea >

          <Button>
            {params.id ? 'Editar Tarea' : 'Crear Tarea'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default TaskFormPage