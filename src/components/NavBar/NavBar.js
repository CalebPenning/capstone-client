import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
    <div>
        <nav>
            <NavLink exact to="/">Cinema</NavLink>
            <NavLink exact to="/media/search">Search</NavLink>
        </nav>
    </div>)
}

export default NavBar