import { NavLink } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../UserContext"

const NavBar = () => {
    const { currentUser, setCurrentUser, token, setToken } = useContext(UserContext)
    const logout = () => {
        if (token || currentUser) {
            setToken(null)
            setCurrentUser()
        }
        else console.log("no token set, this is a bug")
    }

    if (currentUser) return (
    <div>
        <nav>
            <NavLink exact to="/">Cinema</NavLink>
            <NavLink exact to="/media/search">Search</NavLink>
            <NavLink exact to={`/users/${currentUser.id}`}>My Profile</NavLink>
            <NavLink onClick={logout} to="/logout">Logout</NavLink>
        </nav>
    </div>)

    else return (
        <div>
            <nav>
                <NavLink exact to="/">Cinema</NavLink>
                <NavLink exact to="/login">Login</NavLink>
                <NavLink exact to="/register">Register</NavLink>
            </nav>
        </div>
    )
}

export default NavBar