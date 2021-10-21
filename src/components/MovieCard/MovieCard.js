import { NavLink } from "react-router-dom"

const MovieCard = ({ item }) => {
    return (
        <div className="col-md-6" key={item.imdbID}>
            <div className="card">
                <div className="card-body text-center">
                    <img className="card-img-top" src={item.Poster} alt={`Poster art for the ${item.Type} "${item.Title}", released in ${item.Year}`} />
                    <h3 className="card-title"><NavLink to={`/media/${item.imdbID}`}>{item.Title}</NavLink></h3>
                    <p className="card-text">{`${item.Type} released in ${item.Year}`}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard