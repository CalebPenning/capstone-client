import FollowButton from "../FollowButton/FollowButton"
import { NavLink } from "react-router-dom"
import UserContext from "../UserContext"
import { useContext } from "react"


const UserCard = ({ user }) => {
    const { currentUser } = useContext(UserContext)
    
    return (<div className="col-md-6 mb-3" key={user.userID}>
        <div className="card">
            <div className="card-body text-center" >
              <em className="card-title">
                    <NavLink className="display-6" to={`/users/${user.userID}`}>{user.username}</NavLink>
              </em>
              <p className="h6"><b>User Bio: </b>{user.bio}</p>
              <FollowButton userID={user.userID} currentUser={currentUser} />
            </div>
        </div>
    </div>)
}

export default UserCard