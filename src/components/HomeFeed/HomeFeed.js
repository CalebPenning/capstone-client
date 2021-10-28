import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import ReviewCard from "../ReviewCard/ReviewCard"
import Loading from "../Loading"

const HomeFeed = () => {
    const { currentUser } = useContext(UserContext)
    
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const getHomepage = async id => {
            let res = await CinemaApi.getHomepagePosts(id)
            console.log(res)
            if (res.posts.length) setPosts(res.posts)
            else setMessage("Once you follow some friends, their latest posts will appear here!")
            setIsLoading(false)
        }
        if (isLoading && currentUser) getHomepage(currentUser.id)
    }, [isLoading, currentUser])

    if (isLoading) return <Loading />

    else return (
        <div className="row">
            { 
            message ?
            <div className="mb-3 p-5 text-center bg-light">
                <p className="display-6">{message}</p>
            </div> :
            posts.map(el => (
                <ReviewCard review={el} currentUser={currentUser} key={el.reviewID} />
            ))
            }
        </div>
    )
}

export default HomeFeed