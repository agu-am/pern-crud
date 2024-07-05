import {z} from "zod"

export const signUpSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(1).max(255),
    email: z.string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo debe ser un texto"
    }).email({
        message: "El correo no es valido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña debe ser un texto"
    }).min(6).max(255)
})  

export const signInSchema = z.object({
    email: z.string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo debe ser un texto"
    }).email({
        message: "El correo no es valido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña debe ser un texto"
    }).min(6,{
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(255)
})