import { NavLink } from "react-router-dom"

const MediaList = ({data}) => (
    <div>
        {data.map(el => (
            <div key={el.imdbID}>
                <h3><NavLink to={`/media/${el.imdbID}`} >{el.Title}</NavLink></h3>
                <pre>Type: {el.Type}</pre>
                <pre>Genre&#40;s&#41;: {el.Genre}</pre>
                <pre>Release Year: {el.Year}</pre>
                <pre>Full Plot:</pre>
                <p>{el.Plot || "To be filled in soon"}</p>
                <img src={el.Poster} alt={`Poster for ${el.Title}`} />
            </div>
        ))}
    </div>
)

export default MediaList