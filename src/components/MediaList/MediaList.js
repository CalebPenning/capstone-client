import { NavLink } from "react-router-dom"

const MediaList = ({data}) => (
    <div className="container">
        {data.map(el => (
            <div className="card" key={el.imdbID} style={{width: "50%"}}>
                <img className="card-img-top" src={el.Poster} alt={`Poster for ${el.Title}`} style={{height: "50%"}}/>
                <h3><NavLink to={`/media/${el.imdbID}`} >{el.Title}</NavLink></h3>
                <pre>Type: {el.Type}</pre>
                <pre>Genre&#40;s&#41;: {el.Genre}</pre>
                <pre>Release Year: {el.Year}</pre>
                <pre>Full Plot:</pre>
                <p>{el.Plot || "To be filled in soon"}</p>
            </div>
        ))}
    </div>
)

export default MediaList