import { Link, useNavigate } from "react-router-dom"
import { Card, Input, Button, Label } from "../components/ui"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"

function LoginPage() {

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  const { signIn, errors } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signIn(data)
    if (user) navigate('/profile')
  })

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        {
          errors && (
            errors.map(error => (
              <p key={error} className="bg-red-500 text-white p-2 my-2 rounded-sm text-center">{error}</p>
            ))
          )
        }
        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesion</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor={"email"}>
            Email
          </Label>
          <Input placeholder="Ingrese su correo" type="email" {...register("email", { required: true })} />
          <Label htmlFor={"password"}>
            Contraseña
          </Label>
          <Input placeholder="Ingrese su contraseña" type="password" {...register("password", { required: true })} />
          <Button>
            Ingresar
          </Button>
          <div className="flex justify-between my-4">
            <p>
              No estas registrado?
            </p>
            <Link to="/register" className="font-bold">Registrate</Link>
          </div>
        </form>
      </Card>

    </div>
  )
}

export default LoginPage