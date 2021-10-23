import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import ReviewCard from "../ReviewCard/ReviewCard"
import UserContext from "../UserContext"

const LikedList = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [likedReviews, setLikedReviews] = useState([])

    useEffect(() => {
        const getLikedReviews = async id => {
            let res = await CinemaApi.getLikedReviews(id)
            console.log(res.likes)
            if (res.likes.length) setLikedReviews(res.likes)
            console.log(likedReviews)
            setIsLoading(false)
        }
        if (isLoading) getLikedReviews(id)
    }, [id, isLoading, likedReviews])

    if (isLoading) return <div>Loading...</div>
    else if (!isLoading && likedReviews.length > 0) {
        return (
            <div className="row">
                <h3></h3>
                {likedReviews.map(el => (
                    <ReviewCard review={el} currentUser={currentUser} isLoading={isLoading} setIsLoading={setIsLoading} />
                ))}
            </div>
        )
    }

    else return <div>This user doesn't have any liked posts.</div>
}

export default LikedList