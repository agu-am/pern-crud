import { Button, Card, Container, Input, Label } from "../components/ui"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { signUp, errors: signUpErrors } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const user = await signUp(data)
    if (user) navigate('/profile')
  })

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
      {
          signUpErrors && (
            signUpErrors.map(error => (
              <p key={error} className="bg-red-500 text-white p-2 my-2 rounded-sm text-center">{error}</p>
            ))
          )
        }
        <h3 className="text-4xl font-bold">Register</h3>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input
            // id="name"
            placeholder="Ingrese su nombre"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">El nombre es requerido</p>}
          <Label htmlFor="email">Correo</Label>
          <Input
            placeholder="Ingrese su correo"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">El correo es requerido</p>}
          <Label htmlFor="password">Contraseña</Label>
          <Input
            placeholder="Ingrese su contraseña"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
          <Button>Registrar</Button>
          <div className="flex justify-between my-4">
            <p>
              Ya tenes cuenta?
            </p>
            <Link to="/login" className="font-bold ml-1">Iniciar sesion</Link>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage