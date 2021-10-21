import UserContext from "../UserContext"
import HomeFeed from "../HomeFeed/HomeFeed"
import { useContext } from "react"

const Home = () => {
    const { currentUser } = useContext(UserContext)
    if (currentUser) return (
        <div>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5 bg-light text-center">
                    <pre className="display-6">Hello {currentUser.username}!</pre>
                    <h5 className="display-5 fw-bold">Here's the latest posts from people you follow:</h5>
                    
                </div>
            </div>
            <div className="container">
                <HomeFeed />
            </div>
        </div>
        )
    else return (
        <div>
            <p>Hi there! Sign in or Register to get started.</p>
        </div>
    )
}

export default Home