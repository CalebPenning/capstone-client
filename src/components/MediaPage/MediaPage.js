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

    // if (showForm) return <ReviewForm media={media} />

    else return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5 bg-light text-center w-75 mx-auto" >
                <h3 className="display-4">{media.Title} ({media.Year})</h3>
                <img src={media.Poster} alt={`A poster for the ${media.Type}, ${media.Title}`} />
                <p>Genre&#40;s&#41;: <b>{media.Genre}</b></p>
                <p>Rated: <b>{media.Rated}</b></p>
                <p>Directed by: <b>{media.Director}</b></p>
                <pre>Written by: <b>{media.Writer}</b></pre>
                <pre>Starring: <b>{media.Actors}</b></pre>
                <div className="mb-3 w-75 mx-auto">
                    <h5>Plot Synopsis: </h5>
                    <p>{media.Plot}</p>
                </div>
                { reviewsVisible ? <h3>Reviews:</h3> : null}
                { showForm ? <ReviewForm media={media} /> : null }
                { reviewsVisible ? 
                    <div className="row">
                        <MediaReviews />
                    </div> : null }
                {currentUser ? <button className="btn btn-sm btn-secondary mb-3" onClick={toggleFormVis}>{ showForm ? "Go Back" : "Write A Review" }</button> : null}
                <button className="btn btn-sm btn-primary mb-3" onClick={toggleReviewVis}>{reviewsVisible ? "Hide reviews" : "Display Reviews"}</button>
            </div>
        </div>
    )
}

export default MediaPage