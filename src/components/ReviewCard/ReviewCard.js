import LikeButton from "../LikeButton/LikeButton"
import { NavLink } from "react-router-dom"
import DeleteButton from "../DeleteButton/DeleteButton"

const ReviewCard = ({ review, currentUser, isLoading=null, setIsLoading=null }) => {
    return (
        <div className="col-md-6 mb-3" key={review.reviewID}>
            <div className="card">
                <div className="card-body text-center" >
                    <h3 className="card-title">{review.reviewTitle}</h3>
                    <p><em>
                        Review for &nbsp;
                        <b><NavLink to={`/media/${review.movieID}`}>
                        {review.movieTitle}
                        </NavLink></b>
                    </em></p>
                    <h5><b>User Rating: {review.rating} / 10</b></h5>
                    <blockquote className="blockquote">
                        {review.body}
                    </blockquote>
                    <figcaption 
                    className="mb-3 blockquote-footer">
                        <em><NavLink to={`/users/${review.userID}`}>
                            {review.postedBy}
                            </NavLink> 
                            &nbsp; on {review.createdAt.slice(0, 10)} 
                        </em></figcaption>
                    { 
                        review.userID === currentUser.id ? 
                        <DeleteButton currentUser={currentUser} review={review} isLoading={isLoading} setIsLoading={setIsLoading} /> : 
                        <LikeButton 
                        user={currentUser} 
                        reviewID={review.reviewID} /> }
                </div>
            </div>
        </div>
    )
}

export default ReviewCard