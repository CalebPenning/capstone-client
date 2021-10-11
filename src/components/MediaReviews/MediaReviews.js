import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"

const MediaReviews = () => {
    const { imdbID } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getReviews = async id => {
            let res = await CinemaApi.getMediaReviews(id)
            setReviews(res)
            setIsLoading(false)
        }
        getReviews(imdbID)
    }, imdbID)

    if (!reviews.length && isLoading) return (
        <div>
            Loading...
        </div>
    )

    else return (
        reviews.map(el => (
            <div>
                <h3>{el.reviewTitle}</h3>
                <p>{el.body}</p>
                <pre>Posted on {el.createdAt} by user <b><NavLink to={`/users/${el.userID}`}>{el.username}</NavLink></b></pre>
            </div>
        ))
    )
}

export default MediaReviews