import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import ReviewCard from "../ReviewCard/ReviewCard"

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
            else setMessage("Follow Some Users And Get Your Homepage Set Up!")
            setIsLoading(false)
        }
        if (isLoading && currentUser) getHomepage(currentUser.id)
    }, [isLoading, currentUser])

    if (isLoading) return <div>Loading...</div>

    else return (
        <div className="row">
            { 
            message ?
            message :
            posts.map(el => (
                <ReviewCard review={el} currentUser={currentUser} key={el.reviewID} />
            ))
            }
        </div>
    )
}

export default HomeFeed