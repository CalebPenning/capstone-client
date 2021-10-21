import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import LikeButton from "../LikeButton/LikeButton"

const HomeFeed = () => {
    const { currentUser } = useContext(UserContext)
    
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        const getHomepage = async id => {
            let res = await CinemaApi.getHomepagePosts(id)
            console.log(res)
            if (res.posts.length) setPosts(res.posts)
            else setMessage("Follow Some Users And Get Your Homepage Set Up!")
            setIsLoading(false)
        }
        if (isLoading && currentUser) getHomepage(currentUser.id)
    }, [isLoading, currentUser])

    if (isLoading) return <div>Loading...</div>

    else return (
        <div className="row">
            { 
            message ?
            message :
            posts.map(el => (
                <div key={el.reviewID} className="col-sm-6">
                    <h3>{el.reviewTitle}</h3>
                <p>Review for <b><NavLink to={`/media/${el.movieID}`}>{el.movieTitle}</NavLink></b></p>
                    <h4>Rating: {el.rating}</h4>
                    <p>{el.body}</p>
                    <pre>Posted on {el.createdAt} by user <b><NavLink to={`/users/${el.userID}`}>{el.postedBy}</NavLink></b></pre>
                    <LikeButton user={currentUser} reviewID={el.reviewID} />
                </div>
            ))
            }
        </div>
    )
}

export default HomeFeed