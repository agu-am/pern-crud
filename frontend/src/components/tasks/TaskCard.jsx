import { Button, Card } from "../ui"
import { useTask } from "../../context/TaskContext"
import { useNavigate } from "react-router-dom"
import { BsTrash , BsPencilSquare } from "react-icons/bs";
function TaskCard({ task }) {

    const { deleteTask } = useTask()

    const navigate = useNavigate()

    return (
        <Card key={task.id} className="px-7 py-4 flex flex-col justify-between">
            <div>
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <p>{task.description}</p>
            </div>
            <div className="flex my-2 justify-end gap-x-2">
                <Button
                    onClick={() =>
                        navigate(`/tasks/${task.id}/edit`)
                    }
                ><BsPencilSquare /> Editar</Button>
                <Button
                    className={"bg-red-800 hover:bg-red-600"}
                    onClick={async () => {
                        if (window.confirm('¿Estas seguro de eliminar esta tarea?')) {
                            await deleteTask(task.id)
                        }
                    }}
                ><BsTrash /> Eliminar</Button>
            </div>
        </Card>
    )
}

export default TaskCard