import UserContext from "../UserContext"
import HomeFeed from "../HomeFeed/HomeFeed"
import { useContext } from "react"

const Home = () => {
    const { currentUser } = useContext(UserContext)
    if (currentUser) return (
        <HomeFeed />
        )
    else return (
        <div>
            <p>Hi there! Sign in or Register to get started.</p>
        </div>
    )
}

export default Home