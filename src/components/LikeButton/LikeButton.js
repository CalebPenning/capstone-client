import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import "./LikeButton.css"

const LikeButton = ({ user, reviewID }) => {
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getLikes = async () => {
            let res = await CinemaApi.getLikedReviews(user.id)
            if (res.likes.length || Array.isArray(res.likes)) setLikes(res.likes)
            setIsLoading(false)
        }
        if (isLoading) getLikes()
    }, [user, isLoading])
    
    const likeReview = async e => {
        e.preventDefault()
        let result = await CinemaApi.likeReview(user.id, reviewID)
        console.log(result)
        setIsLoading(true)
    }

    const unlikeReview = async e => {
        e.preventDefault()
        let result = await CinemaApi.unlikeReview(user.id, reviewID)
        console.log(result)
        setIsLoading(true)
    }

    let likedReviews = likes.map(el => el.reviewID)

    if (isLoading) return <div>Loading...</div>

    if (!isLoading && likedReviews.includes(reviewID)) return (
        <button className="liked" onClick={unlikeReview}>Unlike</button>
    )

    else if (!isLoading && !likedReviews.includes(reviewID)) return (
        <button onClick={likeReview}>Like</button>
    )
}

export default LikeButton