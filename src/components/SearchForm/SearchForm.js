import { useEffect, useState } from "react"
import CinemaApi from "../../Api"
import axios from "axios"

const SearchForm = ({ setData, page}) => {
    const [searchData, setSearchData] = useState({
        s: "",
        page: +page
    })
    const [errs, setErrs] = useState([])
    console.log(searchData)
    const handleChange = e => {
        try {
            let { name, value } = e.target
            setSearchData(data => ({
                ...data,
                [name]: value
            }))
        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(`THIS IS THE DATA BEING PASSED: ${searchData.s}`)
        let res = await CinemaApi.searchMovies(searchData)
        console.log(`I am res ${res}`)
        if (res.data.Error) {
            console.log(res.data.Error)
            setErrs([].push(res.data.Error))
            return
        }
        setData(res.data.Search)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <pre>{errs.length ? errs: null}</pre>
                <label htmlFor="search-term">
                    Search Term
                </label>
                <input type="text" name="s" id="search-term" onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchForm