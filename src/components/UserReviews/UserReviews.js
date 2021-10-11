import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"

const UserReviews = () => {
    const { id } = useParams()
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
    }, [id])

    if (isLoading) return (
        <div>Loading...</div>
    )

    else return (
        reviews.map(el => (
            <div>
                <h3>{el.reviewTitle}</h3>
                <pre>Review for <NavLink to={`/media/${el.movieID}`}>{el.movieTitle}</NavLink></pre>
                <p>{el.body}</p>
                <pre></pre>
            </div>
        ))
    )
}

export default UserReviews