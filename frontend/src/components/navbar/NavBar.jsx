import { Link, useLocation } from "react-router-dom"
import { navigation } from "./navigation"
import { Container } from "../ui"

function NavBar() {

    const location = useLocation()

    return (
        <nav className="bg-zinc-950">
            <Container className="flex justify-between py-3">
                <Link to='/'>
                    <h1 className="font-bold text-2xl">
                        Pern Task
                    </h1>
                </Link>
                <ul className="flex gap-x-3">
                    {
                        navigation.map(({ name, href }) => (
                            <li key={name} className={`
                            px-3 py-1 ${location.pathname === href && 'bg-sky-500 '}
                            `}>
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