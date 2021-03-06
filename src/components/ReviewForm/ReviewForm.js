import UserContext from "../UserContext"
import CinemaApi from "../../Api"
import { useState, useContext, useEffect } from "react"
import { Redirect } from "react-router-dom"

const ReviewForm = ({ media}) => {
    const { token, currentUser } = useContext(UserContext)

    const userID = currentUser.id 
    const movieID = media.imdbID 

    const initialState = {
        userID,
        movieID,
        title: "",
        rating: 0,
        body: ""
    }

    const [formData, setFormData] = useState(initialState)
    const [hasPosted, setHasPosted] = useState(false)
    const [err, setErr] = useState("")

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
        if (!formData.title.trim()) {
            setErr("Write a title for your review")
            return
        }
        if (formData.rating < 1) {
            setErr("Please select a rating")
            return
        }
        if (!formData.body.trim()) {
            setErr("Look. If you're gonna write a review, it's gotta have a body. Call me old-fashioned.")
            return
        }
        let res = await CinemaApi.postReview(formData)
        if (!res.created) {
            console.log(res)
            return
        }
        setHasPosted(!hasPosted)
    }

    useEffect(() => {
        const errCleanUp = () => {
            setTimeout(() => setErr(""), 3000)
        }
        if (err) errCleanUp()
    })

    if (!userID || !movieID) return <Redirect to={`/media/search`} />

    if (!token || !currentUser) return <Redirect to="/login" />

    if (hasPosted) return <Redirect to={`/users/${userID}`} />
    else return (
        <div className="mb-3 review-form">
            <h3 className="mb-3">Write a review for {media.Title}</h3>
            { err ? <div className="alert alert-danger">{err}</div> : null}
            <form onSubmit={handleSubmit}>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input type="text" 
                    name="title" 
                    id="title" 
                    maxLength={100} 
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    />
                </div>
                <div className="mb-5 w-25 mx-auto">
                    <label className="form-label" htmlFor="rating">Rating</label>
                    <input type="number" className="form-control" name="rating" id="rating" min={1} max={10} defaultValue={1} onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="body">Body</label>
                    <textarea className="form-control" maxLength={500} name="body" id="body" rows={5} cols={33} onChange={handleChange} />
                </div>         
                <button className="btn btn-sm btn-dark">Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm