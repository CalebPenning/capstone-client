import { useState, useEffect } from "react"
import CinemaApi from "../../Api"
import "./FollowButton.css"

const FollowButton = ({ userID, currentUser }) => {
    const [following, setFollowing] = useState([])
    const [hasUpdated, setHasUpdated] = useState(false)
    console.log(`Here is the current user ${currentUser}`)
    useEffect(() => {
        const getFollowedUsers = async id => {
            let res = await CinemaApi.getFollowedUsers(id)
            console.log(res)
            if (res.following.length) setFollowing(res.following)
            setHasUpdated(false)
        }
        if (currentUser.id) getFollowedUsers(currentUser.id)
    }, [currentUser, hasUpdated])

    const users = following.map(el => el.userID)
    console.log(users, following)
    const followUser = async () => {
        let res = await CinemaApi.followUser(currentUser.id, userID)
        if (res.followed) setHasUpdated(true)
        else console.log(res)
    }

    const unFollowUser = async () => {
        let res = await CinemaApi.unfollowUser(currentUser.id, userID)
        if (res.unfollowed) setHasUpdated(true)
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