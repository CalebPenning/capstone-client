import SearchForm from "../SearchForm/SearchForm"
import MediaList from "../MediaList/MediaList"
import { useState, useEffect } from "react"


const SearchPage = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const errCleanUp = () => {
            setTimeout(() => setError(""), 3000)
        }
        if (error) errCleanUp()
    }, [error]) 
    return (
        <>
            {error.length ? <div className="text-center alert alert-danger">{error}</div> : null}
            <SearchForm setData={setData} setError={setError}/>
            <MediaList data={data} />
        </>
    )
}

export default SearchPage