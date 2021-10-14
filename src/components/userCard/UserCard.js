import { NavLink, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import UserReviews from "../UserReviews/UserReviews"
import FollowingList from "../FollowingList/FollowingList"

const UserCard = () => {
    const { id } = useParams()
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
        <div>
            <h3>{user.username}'s Profile</h3>
            <h4>Bio: </h4>
            <p>{user.bio}</p>
            <h5>Reviews: </h5>
            <div>
                <UserReviews />
            </div>
            <h6><NavLink to={`/users/${id}/following`}>Following</NavLink></h6>
            <h6><NavLink to={`/users/${id}/followers`}>Followers</NavLink></h6>
            <h6><NavLink to={`/users/${id}/likes`}>Likes</NavLink></h6>
        </div>
    )
}

export default UserCard