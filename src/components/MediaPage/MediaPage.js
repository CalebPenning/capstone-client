import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import MediaReviews from "../MediaReviews/MediaReviews"
import UserContext from "../UserContext"
import ReviewForm from "../ReviewForm/ReviewForm"

const MediaPage = () => {
    const {imdbID} = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [media, setMedia] = useState({})
    const [reviewsVisible, setReviewsVisible] = useState(false)
    const [showForm, setShowForm] = useState(false)

    console.debug(imdbID)

    const toggleReviewVis = () => {
        setReviewsVisible(!reviewsVisible)
    }

    const toggleFormVis = () => {
        setShowForm(!showForm)
    }

    useEffect(() => {
        const getMedia = async id => {
            let res = await CinemaApi.getMovie(id)
            setMedia(res.result)
            setIsLoading(false)
        }
        getMedia(imdbID)
    }, [imdbID])

    if (!media.Title && isLoading) return (
        <div>
            Loading...
        </div>
    )

    if (showForm) return <ReviewForm media={media} />

    else return (
        <div>
            <h3>{media.Title} ({media.Year})</h3>
            <img src={media.Poster} alt={`A poster for the ${media.Type}, ${media.Title}`} />
            <pre>Genre&#40;s&#41;: {media.Genre}</pre>
            <pre>Rated: <b>{media.Rated}</b></pre>
            <pre>Directed by: <b>{media.Director}</b></pre>
            <pre>Written by: <b>{media.Writer}</b></pre>
            <pre>Starring: <b>{media.Actors}</b></pre>
            <h5>Plot Synopsis: </h5>
            <p>{media.Plot}</p>
            <h3>Reviews:</h3>
            {currentUser ? <button onClick={toggleFormVis}>Write A Review</button> : null}
            <button onClick={toggleReviewVis}>{reviewsVisible ? "Hide reviews" : "Display Reviews"}</button>
            {reviewsVisible ? <MediaReviews /> : <div></div>}
        </div>
    )
}

export default MediaPage