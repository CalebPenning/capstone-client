import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import UserCard from "../UserCard/UserCard"

const FollowingList = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const getFollowedUsers = async id => {
            let res = await CinemaApi.getFollowedUsers(id)
            console.log(res)
            if (res.following.length) setFollowing(res.following)
            setIsLoading(false)
        }
        getFollowedUsers(id)
    }, [id])

    if (isLoading) return (
        <div className="text-center">Loading...</div>
    )

    if (!isLoading && !following.length) return <div>This user doesn't follow anyone yet!</div>

    else return (
        <div className="row text-center">
            {following.map(el => (
                <UserCard user={el} />
            ))}
        </div>

    )
}

export default FollowingList