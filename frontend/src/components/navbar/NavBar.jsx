import { Link, useLocation } from "react-router-dom"
import { publicRoutes, privateRoutes } from "./navigation"
import { Container } from "../ui"
import { useAuth } from "../../context/AuthContext"
import { twMerge } from "tailwind-merge"

function NavBar() {

    const { isAuth, logout } = useAuth()

    const location = useLocation()

    return (
        <nav className="bg-zinc-950">
            <Container className="flex justify-between py-3">
                <Link to='/'>
                    <h1 className="font-bold text-2xl">
                        Pern Task
                    </h1>
                </Link>
                <ul className="flex gap-x-1">

                    {isAuth ? (
                        <>
                            {privateRoutes.map(({ name, href }) => (
                                <li
                                    className={twMerge('text-color-slate-300 flex items-center px-3 py-1', location.pathname === href && 'bg-sky-500 ')}
                                    key={name}
                                >
                                    <Link to={href}>{name}</Link>
                                </li>
                            ))}
                            <li
                                className='text-color-slate-300 flex items-center px-3 py-1 hover:cursor-pointer'
                                onClick={() => {
                                    logout()
                                }}
                            >
                                Logout
                            </li>
                        </>

                    ) : publicRoutes.map(({ name, href }) => (
                        <li
                            key={name}
                            className={twMerge('text-color-slate-300 flex items-center px-3 py-1', location.pathname === href && 'bg-sky-500 ')}
                        >
                            <Link to={href}>{name}</Link>
                        </li>
                    ))
                    }

                </ul>
            </Container>
        </nav >
    )
}

export default NavBar