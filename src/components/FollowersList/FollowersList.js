import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import CinemaApi from "../../Api"
import Loading from "../Loading"
import UserCard from "../UserCard/UserCard"

const FollowersList = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [followers, setFollowers] = useState([])
    const [pageOwner, setPageOwner] = useState({})

    useEffect(() => {
        const getFollowers = async id => {
            let res = await CinemaApi.getFollowers(id)
            console.log(`Here is the followers res: ${res}`)
            if (res.followers.length) setFollowers(res.followers)
            setIsLoading(false)
        }
        getFollowers(id)
    }, [id])

    useEffect(() => {
        const getUserFromProfile = async id => {
            let res = await CinemaApi.getProfile(id)
            if (res.user) setPageOwner(res.user)
            if (isLoading) setIsLoading(false)
        }
        getUserFromProfile(id)
    }, [id, isLoading])

    if (isLoading) return <Loading />

    if (!isLoading && !followers.length) return (
        <div className="p-5 mb-4 bg-light">
            <NavLink to={`/users/${pageOwner.id}`} 
            className="btn btn-sm btn-primary" >
                Go Back
            </NavLink>
            <div className="p-5 mb-4 bg-light text-center">
                <pre className="display-4">
                    Uh Oh!
                </pre>
                <p className="h6"><b>
                    {pageOwner.username} doesn't have any followers yet!
                </b>
                </p>
            </div>
        </div>
    )

    else return (
        <div className="row p-5 bg-light text-center">
            <div className="p-5 mb-4 bg-light">
                <pre className="display-6">
                    {followers.length} users follow {pageOwner.username}    
                </pre>    
            </div> 
            {followers.map(el => (
                <UserCard user={el} />
            ))}
        </div>
    )
}

export default FollowersList