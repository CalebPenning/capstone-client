import SearchForm from "../SearchForm/SearchForm"
import MediaList from "../MediaList/MediaList"
import UserContext from "../UserContext"
import { useContext } from "react"

const SearchPage = () => {
    const { data, setData } = useContext(UserContext)
    return (
        <>
            <SearchForm setData={setData} />
            <MediaList data={data} />
        </>
    )
}

export default SearchPage