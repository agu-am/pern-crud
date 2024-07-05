import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../api/axios'
import Cookie from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState(null)

    const signUp = async (data) => {
        try {
            const res = await axios.post("/signup", data)
            console.log(res.data)
            setUser(res.data)
            setIsAuth(true)

            return res.data
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                //Si el error es un array lo seteamos tal cual
                return setErrors(error.response.data)
            }
            //Si el error es un objeto lo transformamos en un array y lo seteamos
            setErrors([error.response.data.message])
        }
    }

    const signIn = async (data) => {
        try {
            const res = await axios.post("/signin", data)
            console.log(res)
            setUser(res.data)
            setIsAuth(true)

            return res.data
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                //Si el error es un array lo seteamos tal cual
                return setErrors(error.response.data)
            }
            //Si el error es un objeto lo transformamos en un array y lo seteamos
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        console.log(Cookie.get('token'))
        axios
            .get("/profile")
            .then((res) => {
                setUser(res.data)
                setIsAuth(true)
            })
            .catch((error) => {
                console.log(error)
                setUser(null)
                setIsAuth(false)
            })
    }, [])

    return <AuthContext.Provider value={{
        user,
        isAuth,
        errors,
        signUp,
        signIn
    }}>
        {children}
    </AuthContext.Provider>
}