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
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5 bg-light text-center">
                    <pre className="display-4">
                        Welcome to Cinema!
                    </pre>
                    <p>Cinema is the social media application that allows you and friends to review your favorite films, television shows, video games, and more!</p>
                    <p>To get started, register an account with us!</p>
                    <p>If you're an existing user, login!</p>
                    <pre className="display-6">Happy watching!</pre>
                </div>
            </div>
        </div>
    )
}

export default Home