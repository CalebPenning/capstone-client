import CinemaApi from "../../Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const DeleteButton = ({ currentUser=null, review, isLoading=null, setIsLoading=null }) => {
    
    const deleteReview = async id => {
        if (isLoading === false) setIsLoading(true)
        let res = await CinemaApi.deleteReview(id)
        if (res.deleted) console.log(res)
        setIsLoading(false)
    }

    if (isLoading) return <button className="btn btn-danger"><i className="fas fa-spinner"></i></button>

    else if (review.userID === currentUser.id && !isLoading) return (
        <FontAwesomeIcon icon={faTrash} className="delete-button" onClick={() => deleteReview(review.reviewID)} />
    )

    if (!currentUser) return null
}

export default DeleteButton