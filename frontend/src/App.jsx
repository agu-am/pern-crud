import { Routes, Route, Outlet } from "react-router-dom"

import NavBar from "./components/navbar/NavBar.jsx"
import { Container } from "./components/ui"

import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

import { useAuth } from "./context/AuthContext.jsx"
import { TaskProvider } from "./context/TaskContext.jsx"

import HomePage from "./pages/HomePage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import TasksPage from "./pages/TasksPage.jsx"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import NotFound from "./pages/NotFound.jsx"



function App() {
  const { isAuth, loading } = useAuth()
  if (loading) return <h1>Loading...</h1>
  return (
    <>
      <NavBar />
      <Container className="py-5">
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/tasks" />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}>
            <Route element={
              <TaskProvider>
                <Outlet />
              </TaskProvider>
            }
            >

              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/new" element={<TaskFormPage />} />
              <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            </Route>

            <Route path="/profile" element={<ProfilePage />} />

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Container>
    </>
  )
}

export default App
