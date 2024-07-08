import { Link, useNavigate } from "react-router-dom"
import { Card, Input, Button, Label, Container } from "../components/ui"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const { signIn, errors : loginErrors } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signIn(data)
    if (user) navigate('/tasks')
  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {
          loginErrors && (
            loginErrors.map(error => (
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
          {errors.email && <p className="text-red-500">El correo es requerido</p>}
          <Label htmlFor={"password"}>
            Contraseña
          </Label>
          <Input placeholder="Ingrese su contraseña" type="password" {...register("password", { required: true })} />
          {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
          <Button>
            Ingresar
          </Button>
          <div className="flex justify-between my-4">
            <p className="mr-2">
              No estas registrado?
            </p>
            <Link to="/register" className="font-bold">Registrate</Link>
          </div>
        </form>
      </Card>

    </Container>
  )
}

export default LoginPage