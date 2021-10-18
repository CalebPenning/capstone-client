import UserContext from "../UserContext"
import HomeFeed from "../HomeFeed/HomeFeed"
import { useContext } from "react"

const Home = () => {
    const { currentUser } = useContext(UserContext)
    if (currentUser) return (
        <>
            <h2>Hello there, {currentUser.username}!</h2>
            <h3>Here's the latest posts from people you follow:</h3>
            <HomeFeed />
        </>
        )
    else return (
        <div>
            <p>Hi there! Sign in or Register to get started.</p>
        </div>
    )
}

export default Home