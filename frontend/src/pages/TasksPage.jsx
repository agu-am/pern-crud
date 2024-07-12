import { useEffect } from "react"
import TaskCard from "../components/tasks/TaskCard"
import { useTask } from "../context/TaskContext"
import { useAuth } from "../context/AuthContext"

function TasksPage() {

  const { tasks, loadTasks } = useTask()
  const { isAuth } = useAuth()

  useEffect(() => {
    loadTasks()
  }, [isAuth])

  if (tasks.length === 0) return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-bold">No hay tareas creadas</h1>
    </div>
  )


  return (
    <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {
        tasks.map(task => (
          <TaskCard task={task} key={task.id} />
        ))
      }
    </div>
  )
}

export default TasksPage