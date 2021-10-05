import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CinemaApi from "../../Api"

const MediaPage = () => {
    const {imdbID} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [media, setMedia] = useState({})

    console.debug(imdbID)

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
        </div>
    )
}

export default MediaPage