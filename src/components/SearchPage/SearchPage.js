import SearchForm from "../SearchForm/SearchForm"
import MediaList from "../MediaList/MediaList"
import UserContext from "../UserContext"
import { useContext, useState } from "react"
import CinemaApi from "../../Api"
import jwt from "jsonwebtoken"

const SearchPage = () => {
    const { data, setData } = useContext(UserContext)

    console.log(jwt.decode(CinemaApi.token))
    return (
        <>
            <SearchForm setData={setData}/>
            <MediaList data={data} />
        </>
    )
}

export default SearchPage