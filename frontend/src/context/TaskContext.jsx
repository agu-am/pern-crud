import { createContext, useContext, useState } from "react";
import { getTasksRequest, deleteTaskRequest, createTaskRequest, getTaskRequest, updateTaskRequest } from "../api/task.api";

const TaskContext = createContext()

export const useTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTask must be used within an TaskProvider')
    }

    return context
}

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState(null)

    const loadTasks = async () => {
        const res = await getTasksRequest()
        setTasks(res.data)
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            setTasks([...tasks, res.data])
            return res.data
        } catch (error) {
            setErrors([error.response.data.message])
        }
    }
    const loadTask = async id => {
        const res = await getTaskRequest(id)
        return res.data
    }

    const deleteTask = async (id) => {
        const res = await deleteTaskRequest(id)

        if (res.status === 204) {
            setTasks(tasks.filter(task => task.id !== id))
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task)
            return res
        } catch (error) {
            if (error.response.data) {
                setErrors([error.response.data.message])
            }
        }
    }

    return <TaskContext.Provider
        value={{
            tasks,
            loadTasks,
            deleteTask,
            createTask,
            loadTask,
            updateTask,
            errors
        }}
    >
        {children}
    </TaskContext.Provider>
}