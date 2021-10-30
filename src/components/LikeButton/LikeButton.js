import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import "./LikeButton.css"
import Loading from "../Loading"

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

    if (isLoading) return <Loading />

    if (!isLoading && likedReviews.includes(reviewID)) return (
        // <button className="btn btn-danger" onClick={unlikeReview}>Unlike</button>
        <FontAwesomeIcon icon={faHeart} color="red" className="heart" onClick={unlikeReview} />
    ) 

    else if (!isLoading && !likedReviews.includes(reviewID)) return (
        <FontAwesomeIcon icon={faHeart} className="heart" color="grey" onClick={likeReview} />
    )
}

export default LikeButton