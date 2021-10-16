import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"

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
        <div>Loading...</div>
    )

    if (!isLoading && !following.length) return <div>This user doesn't follow anyone yet!</div>

    else return (
        following.map(el => (
            <div>
                <h3><NavLink to={`/users/${el.userID}`}>{el.username}</NavLink></h3>
                <p><b>Bio: </b>{el.bio}</p>
            </div>
        ))
    )
}

export default FollowingList