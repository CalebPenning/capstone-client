import UserContext from "../UserContext"
import CinemaApi from "../../Api"
import { useState, useContext } from "react"
import { Redirect } from "react-router-dom"

const LoginForm = () => {
    const {token, setToken} = useContext(UserContext)
    const initialState = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState)
    const [errs, setErrs] = useState([])

    const handleChange = e => {
        try {
            const { name, value } = e.target

            setFormData(data => ({
                ...data,
                [name]: value
            }))
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!formData.password || !formData.username) {
            setErrs(data => [...data, `You must fill out all fields`])
        }

        let result = await CinemaApi.login(formData)
        console.log(`login result ${result}`)

        if (result.success && localStorage.length === 0) {
            setFormData(initialState)
            setToken(result.token)
        }
        else console.log(result)
    }

    if (token) return <Redirect to="/" />

    else return (
        <div>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {errs.map(e => <p>{e}</p>)}
        </div>
    )
}

export default LoginForm