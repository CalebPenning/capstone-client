import UserContext from "../UserContext"
import CinemaApi from "../../Api"
import { useState, useContext } from "react"
import { Redirect } from "react-router-dom"

const ReviewForm = ({ media}) => {
    const { token, currentUser } = useContext(UserContext)

    const userID = currentUser.id 
    const movieID = media.imdbID 

    const initialState = {
        userID,
        movieID,
        rating: 0,
        body: ""
    }

    const [formData, setFormData] = useState(initialState)
    const [hasPosted, setHasPosted] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        if (name === "rating") value = +e.target.value
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        console.log(formData, hasPosted)
        let res = await CinemaApi.postReview(formData)
        if (!res.created) {
            console.log(res)
            return
        }
        setHasPosted(!hasPosted)
    }

    if (!userID || !movieID) return <Redirect to={`/media/search`} />

    if (!token || !currentUser) return <Redirect to="/login" />

    if (hasPosted) return <Redirect to={`/users/${userID}`} />
    else return (
        <div>
            <h3>Write a review for {media.Title}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" maxLength={100} onChange={handleChange} />

                <label htmlFor="rating">Rating</label>
                <input type="number" name="rating" id="rating" min={1} max={10} defaultValue={1} onChange={handleChange} />

                <label htmlFor="body">Body</label>
                <textarea maxLength={500} name="body" id="body" rows={5} cols={33} onChange={handleChange} />
            
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm