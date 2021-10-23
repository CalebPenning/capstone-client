import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import ReviewCard from "../ReviewCard/ReviewCard"

const MediaReviews = () => {
    const { imdbID } = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getReviews = async id => {
            let res = await CinemaApi.getMediaReviews(id)
            setReviews(res)
            setIsLoading(false)
        }
        if (isLoading) getReviews(imdbID)
    }, [imdbID, isLoading])

    if (!reviews.length && isLoading) return (
        <div>
            Loading...
        </div>
    )

    else if (reviews.length && !isLoading) return (
        reviews.map(el => (
                <ReviewCard review={el} currentUser={currentUser} isLoading={isLoading} setIsLoading={setIsLoading} />
        ))
    )

    else return (
        <div>No user reviews for this media yet!</div>
    )
}

export default MediaReviews