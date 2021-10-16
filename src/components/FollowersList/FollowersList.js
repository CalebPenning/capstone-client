import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"

const FollowersList = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        const getFollowers = async id => {
            let res = await CinemaApi.getFollowers(id)
            console.log(`Here is the followers res: ${res}`)
            if (res.followers.length) setFollowers(res.followers)
            setIsLoading(false)
        }
        getFollowers(id)
    }, [id])

    if (isLoading) return <div>Loading...</div>

    if (!isLoading && !followers.length) return <div>No one follows this user yet!</div>

    else return (
        <div>
            {followers.map(el => (
                <div key={el.userID}>
                    <h3><NavLink to={`/users/${el.userID}`}>{el.username}</NavLink></h3>
                    <p><b>Bio: </b>{el.bio}</p>
                </div>
            ))}
        </div>
    )
}

export default FollowersList