import MovieCard from "../MovieCard/MovieCard"

const MediaList = ({ data=[] }) => (
    <div className="container">
        <div className="row">
        {data.map(item => (
            <MovieCard item={item} key={item.imdbID} />
        ))}
        </div>
    </div>
)

export default MediaList