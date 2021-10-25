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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" exact to="/"><b>Cinema</b></NavLink>
            <button 
                className="navbar-toggler" type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-4 mb-md-0">
                    <li className="nav-item">
                        <NavLink 
                        exact to="/media/search"
                        className="nav-link"
                        >Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                        exact to={`/users/${currentUser.id}`}
                        className="nav-link">
                            My Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                        to="/logout"
                        onClick={logout}
                        className="nav-link"
                        >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>)

    else return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" exact to="/"><b>Cinema</b></NavLink>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-4 mb-md-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/register">Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

                /* <NavLink exact to="/media/search">Search</NavLink>
                <NavLink exact to={`/users/${currentUser.id}`}>My Profile</NavLink>
                <NavLink onClick={logout} to="/logout">Logout</NavLink>
                 */

export default NavBar