import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import ReviewCard from "../ReviewCard/ReviewCard"
import UserContext from "../UserContext"
import Loading from "../Loading"

const LikedList = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [likeOwner, setLikeOwner] = useState({})
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

    useEffect(() => {
        const getUserFromProfile = async id => {
            let res = await CinemaApi.getProfile(id)
            console.log(res)
            setLikeOwner(res.user)
        }
        getUserFromProfile(id)
    }, [id])

    if (isLoading) return <Loading />

    else if (!isLoading && likedReviews.length > 0) {
        return (
            <div className="p-5 container bg-light">
                <h3 className="text-center mb-5">{likeOwner.username}'s Liked Posts</h3>
                <div className="row">
                    {likedReviews.map(el => (
                        <ReviewCard review={el} currentUser={currentUser} isLoading={isLoading} setIsLoading={setIsLoading} />
                    ))}
                </div>
            </div>
        )
    }

    else return (
        <div className="p-5 text-center bg-light">
            <pre className="display-6">Uh Oh!</pre>
            <p className="h4">This user doesn't have any liked posts.</p>
        </div>
    )
}

export default LikedList