import { useState } from "react"
import CinemaAPI from "../../Api"
import axios from "axios"

const SearchForm = ({ setData }) => {
    const [searchData, setSearchData] = useState({ s: "" })

    const handleChange = e => {
        try {
            const { name, value } = e.target
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
        let results = await axios.get("http://localhost:3001/movies/search", { params: {s: searchData.s}})
        console.log(results)
        setData(results.data.Search)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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