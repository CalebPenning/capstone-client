import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import ReviewCard from "../ReviewCard/ReviewCard"
import Loading from "../Loading"

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

    if (!reviews.length && isLoading) return <Loading />

    else if (reviews.length && !isLoading) return (
        reviews.map(el => (
                <ReviewCard 
                review={el} 
                currentUser={currentUser} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} />
        ))
    )

    else return (
        <div>
            <p className="mb-3 h5">No user reviews for this media yet!</p>
        </div>
    )
}

export default MediaReviews