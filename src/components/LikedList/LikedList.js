import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"

const LikedList = () => {
    const { id } = useParams()
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
            likedReviews.map(el => (
                <div key={el.id}>
                    <h3>{el.reviewTitle}</h3>
                    <pre>Review for {el.movieTitle}</pre>
                    <p>{el.body}</p>
                    <pre>Posted on {el.createdAt} by user <b><NavLink to={`/users/${el.userID}`}>{el.postedBy}</NavLink></b></pre>
                </div>
            ))
        )
    }

    else return <div>This user doesn't have any liked posts.</div>
}

export default LikedList