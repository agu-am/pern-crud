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
    const [loading, setLoading] = useState(true)

    const signUp = async (data) => {
        try {
            const res = await axios.post("/signup", data)
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

    const logout = async () => {
        await axios.post("/logout")
        setUser(null)
        setIsAuth(false)
    }

    useEffect(() => {
        setLoading(true)
        axios
            .get("/profile")
            .then((res) => {
                setUser(res.data)
                setIsAuth(true)
            })
            .catch((error) => {
                setUser(null)
                setIsAuth(false)
            })
        setLoading(false)
    }, [])

    useEffect(() => {
        const clean = setTimeout(() => {
            setErrors(null)
        }, 5000)
        return () => clearTimeout(clean)
    }, [errors])

    return <AuthContext.Provider value={{
        user,
        isAuth,
        errors,
        signUp,
        signIn,
        logout,
        loading
    }}>
        {children}
    </AuthContext.Provider>
}