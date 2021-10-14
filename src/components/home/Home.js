import UserContext from "../UserContext"
import { useContext } from "react"

const Home = () => {
    const { currentUser } = useContext(UserContext)
    return (
    <div>
        <p>Hi there {`${currentUser.username}` || "user"}!</p>
    </div>)
}

export default Home