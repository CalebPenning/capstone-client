import { useParams, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import UserCard from "../UserCard/UserCard"
import Loading from "../Loading"


const FollowingList = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [following, setFollowing] = useState([])
    const [pageOwner, setPageOwner] = useState({})

    useEffect(() => {
        const getFollowedUsers = async id => {
            let res = await CinemaApi.getFollowedUsers(id)
            console.log(res)
            if (res.following.length) setFollowing(res.following)
            if (isLoading) setIsLoading(false)
        }
        getFollowedUsers(id)
    }, [id, isLoading])

    useEffect(() => {
        const getUserFromProfile = async id => {
            let res = await CinemaApi.getProfile(id)
            if (res.user) setPageOwner(res.user)
            if (isLoading) setIsLoading(false)
        }
        getUserFromProfile(id)
    }, [id, isLoading])

    if (isLoading) return (
        <Loading />
    )

    if (!isLoading && !following.length) return (
        <div className="p-5 mb-4 bg-light">
            <NavLink to={`/users/${pageOwner.id}`} className="btn btn-sm btn-primary">Go Back</NavLink>
            <div className="p-5 mb-4 bg-light text-center">
                <pre className="display-4">
                    Uh Oh!
                </pre>
                <p className="h6"><b>{pageOwner.username} isn't following any other users yet!</b></p>
            </div>
        </div>
    )

    else return (
        <div className="row bg-light text-center">
            <div className="p-5 mb-4 bg-light">
                <pre className="display-6">{pageOwner.username} is following {following.length} users</pre>
            </div>
            {following.map(el => (
                <UserCard user={el} />
            ))}
        </div>

    )
}

export default FollowingList