import { useState } from "react"
import CinemaApi from "../../Api"

const SearchForm = ({ setData, setError }) => {
    const [searchData, setSearchData] = useState({
        s: ""
    })

    const handleChange = e => {
        try {
            let { name, value } = e.target
            setSearchData(data => ({
                ...data,
                [name]: value.trim()
            }))
        } catch(e) {
            console.log(e)
        }
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            if (searchData.s.trim().length < 3) {
                setError(`You must pass at least 3 non-whitespace characters`)    
                return
            }
            console.log(`THIS IS THE DATA BEING PASSED: ${searchData.s}`)
            let res = await CinemaApi.searchMovies(searchData)
            console.log(res)
            if (res.data.Response === "False") setError(res.data.Error)
            else setData(res.data.Search)
        } catch(e) {
            console.log(e)
            // setError(e)
        }
    }

    return (
        <div className="container text-center">
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label" htmlFor="search-term">
                        Search Term
                    </label>
                    <input type="text" 
                    name="s" id="search-term" 
                    onChange={handleChange}
                    minLength={3} maxLength={30}
                    className="form-control"
                    // value={searchData.s}
                    required />
                </div>    
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
    )
}

export default SearchForm