import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import ReviewCard from "../ReviewCard/ReviewCard"
import UserContext from "../UserContext"

const UserReviews = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getReviews = async id => {
            let res = await CinemaApi.getUserReviews(id)
            console.log(res.reviews)
            setReviews(res.reviews)
            setIsLoading(false)
        }
        getReviews(id)
    }, [id, isLoading])

    if (isLoading) return (
        <div>Loading...</div>
    )

    else return (
        reviews.map(el => (
            <ReviewCard review={el} currentUser={currentUser || null} isLoading={isLoading} setIsLoading={setIsLoading}  />
        ))
    )
}

export default UserReviews