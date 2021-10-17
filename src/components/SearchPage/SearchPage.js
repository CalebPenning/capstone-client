import SearchForm from "../SearchForm/SearchForm"
import MediaList from "../MediaList/MediaList"
import UserContext from "../UserContext"
import { useContext, useState } from "react"
import CinemaApi from "../../Api"
import jwt from "jsonwebtoken"

const SearchPage = () => {
    const { data, setData } = useContext(UserContext)
    const [page, setPage] = useState(1)

    const incrementPage = () => {
        setPage(page + 1)
    }

    const decrementPage = () => {
        setPage(page - 1 > 1 ? page - 1 : 1)
    }

    console.log(jwt.decode(CinemaApi.token))
    return (
        <>
            <SearchForm setData={setData} page={page} setPage={setPage}/>
            <MediaList data={data} />
            <button onClick={decrementPage}>Page Down</button>
            <p>Page Number: {page}</p>
            <button onClick={incrementPage}>Page Up</button>
        </>
    )
}

export default SearchPage