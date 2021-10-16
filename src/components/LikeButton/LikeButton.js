import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import "./LikeButton.css"

const LikeButton = ({ user, reviewID, setIsLoading }) => {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        const getLikes = async () => {
            let res = await CinemaApi.getLikedReviews(user.id)
            if (res.likes.length) setLikes(res.likes)
        }
        getLikes()
    }, [user])
    
    const likeReview = async e => {
        e.preventDefault()
        let result = await CinemaApi.likeReview(user.id, reviewID)
        setIsLoading(true)
    }

    const unlikeReview = async e => {
        e.preventDefault()
        let result = await CinemaApi.unlikeReview(user.id, reviewID)
        setIsLoading(true)
    }

    let likedReviews = likes.map(el => el.reviewID)

    if (likedReviews.includes(reviewID)) return (
        <button className="liked" onClick={unlikeReview}>Unlike</button>
    )

    else return (
        <button onClick={likeReview}>Like</button>
    )
}

export default LikeButton