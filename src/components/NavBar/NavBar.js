import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
    <div>
        <nav>
            <NavLink exact to="/">Cinema</NavLink>
            <NavLink exact to="/media/search">Search</NavLink>
            <NavLink exact to="/register">Register</NavLink>
            <NavLink exact to="/login">Login</NavLink>
        </nav>
    </div>)
}

export default NavBar