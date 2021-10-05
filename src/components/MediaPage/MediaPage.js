import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CinemaApi from "../../Api"

const MediaPage = () => {
    const imdbID = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [media, setMedia] = useState()

    useEffect(() => {
        const getMedia = async id => {
            let res = await CinemaApi.getMovie(id)
            setMedia(res.result)
            setIsLoading(false)
        }
        getMedia(imdbID)
    }, [imdbID])

    if (!media && isLoading) return (
        <div>
            Loading...
        </div>
    )

    else return (
        <div>
            <h3>{media.Title}</h3>
            <img src={media.Poster} alt={`A poster for the ${media.Type}, ${media.Title}`} />
        </div>
    )
}

export default MediaPage