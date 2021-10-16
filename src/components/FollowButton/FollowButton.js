import { useState, useEffect, useContext } from "react"
import { Redirect } from "react-router"
import CinemaApi from "../../Api"
import UserContext from "../UserContext"
import "./FollowButton.css"

const FollowButton = ({ userID }) => {
    const { currentUser } = useContext(UserContext)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const getFollowedUsers = async id => {
            let res = await CinemaApi.getFollowedUsers(id)
            console.log(res)
            if (res.following.length) setFollowing(res.following)
        }
        getFollowedUsers(currentUser.id)
    }, [currentUser])

    const users = following.map(el => el.userID)
    console.log(users, following)
    const followUser = async () => {
        let res = await CinemaApi.followUser(currentUser.id, userID)
        if (res.followed) return <Redirect to={`/users/${userID}`} />
        else console.log(res)
    }

    const unFollowUser = async () => {
        let res = await CinemaApi.unfollowUser(currentUser.id, userID)
        if (res.unfollowed) return <Redirect to={`/users/${userID}`} />
        else console.log(res)
    }

    if (!currentUser) return null
    if (+currentUser.id === +userID) return <></>
    console.log(`HERES THE CURRENT USER ID ${currentUser.id} HERES THE PASSED ID ${userID}`)
    if (users.includes(+userID)) return (
        <button className="following" onClick={unFollowUser}>Following</button>
    )
    else return (
        <button onClick={followUser}>Follow</button>
    )
}

export default FollowButton