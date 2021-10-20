import { useState } from "react"
import CinemaApi from "../../Api"

const SearchForm = ({ setData }) => {
    const [searchData, setSearchData] = useState({
        s: ""
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
            setErrs([errs].push(res.data.Error))
            return
        }
        setData(res.data.Search)
    }


    return (
        <div>
            {/* { errs ? errs.map(e => <p>{e}</p>) : null} */}
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label" htmlFor="search-term">
                        Search Term
                    </label>
                    <input type="text" 
                    name="s" id="search-term" 
                    onChange={handleChange}
                    className="form-control" />
                </div>    
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
    )
}

export default SearchForm