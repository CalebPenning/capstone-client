import { NavLink, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CinemaApi from "../../Api"
import UserReviews from "../UserReviews/UserReviews"
import FollowButton from "../FollowButton/FollowButton"
import UserContext from "../UserContext"

const UserCard = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUser = async id => {
            let res = await CinemaApi.getProfile(id)
            console.log(res)
            setUser(res.user)
            setIsLoading(false)
        }
        getUser(id)
    }, [id])

    if (isLoading) return (
        <div>Loading...</div>
    )

    else return (
        <div className="mb-3 p-5 bg-light text-center">
            <h3>{user.username}'s Profile</h3>
            <FollowButton userID={id} currentUser={currentUser ? currentUser : {}} />
            <h4 className="mt-3">Bio: </h4>
            <p>{user.bio}</p>
            <NavLink className="m-1 btn btn-sm btn-secondary" to={`/users/${id}/following`}>Following</NavLink>
            <NavLink className="m-1 btn btn-sm btn-secondary" to={`/users/${id}/followers`}>Followers</NavLink>
            <NavLink className="m-1 btn btn-sm btn-secondary" to={`/users/${id}/likes`}>Likes</NavLink>
            <h5 className="mt-3">Reviews: </h5>
            <div className="row">
                <UserReviews />
            </div>
        </div>
    )
}

export default UserCard