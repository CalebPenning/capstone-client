import CinemaApi from "../../Api"

const DeleteButton = ({ currentUser=null, review, isLoading=null, setIsLoading=null }) => {
    
    const deleteReview = async id => {
        if (isLoading === false) setIsLoading(true)
        let res = await CinemaApi.deleteReview(id)
        if (res.deleted) console.log(res)
        setIsLoading(false)
    }

    if (isLoading) return <button className="btn btn-danger"><i className="fas fa-spinner"></i></button>

    else if (review.userID === currentUser.id && !isLoading) return (
        <button className="btn btn-sm btn-danger mb-3" onClick={() => deleteReview(review.reviewID)}>Delete</button>
    )

    if (!currentUser) return null
}

export default DeleteButton