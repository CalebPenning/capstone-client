import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import LikeButton from "../LikeButton/LikeButton"

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

    const deleteReview = async id => {
        let res = await CinemaApi.deleteReview(id)
        console.log(res)
        setIsLoading(true)
    }

    // if review is by a user, add delete button, otherwise, add a like/dislike button

    if (!reviews.length && isLoading) return (
        <div>
            Loading...
        </div>
    )

    else if (reviews.length && !isLoading) return (
        reviews.map(el => {
            console.log(el)
            return (
            <div key={el.reviewID}>
                <h3>{el.reviewTitle}</h3>
                <p>{el.body}</p>
                <pre>Posted on {el.createdAt} by user <b><NavLink to={`/users/${el.userID}`}>{el.username}</NavLink></b></pre>
                {currentUser.id === el.userID ? 
                <button onClick={() => deleteReview(el.reviewID)}>Delete</button> : 
                <LikeButton user={currentUser} reviewID={el.reviewID} />}
            </div>
        )})
    )

    else return (
        <div>No user reviews for this media yet!</div>
    )
}

export default MediaReviews