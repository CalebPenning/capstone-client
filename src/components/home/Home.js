import UserContext from "../UserContext"
import { useContext } from "react"

const Home = () => {
    const { currentUser } = useContext(UserContext)
    if (currentUser) return (
    <div>
        <p>Hi there {currentUser.username}!</p>
    </div>)
    else return (
        <div>
            <p>Hi there! Sign in or Register to get started.</p>
        </div>
    )
}

export default Home