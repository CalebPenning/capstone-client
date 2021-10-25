import UserContext from "../UserContext"
import CinemaApi from "../../Api"
import { useState, useContext } from "react"
import { Redirect } from "react-router-dom"

const RegisterForm = () => {
    const { token, setToken } = useContext(UserContext)
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        bio: ""
    }

    const [formData, setFormData] = useState(initialState)
    const [errs, setErrs] = useState([])
    
    if (token) return <Redirect to="/" />

    const handleChange = e => {
        try {
            const { name, value } = e.target

            setFormData(data => ({
                ...data,
                [name]: value
            }))
        } catch (err) {
            setErrs(err)
        }
    }

    const comparePasswords = async (p1, p2) => {
        
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (errs.length) {
            console.log(errs, "Something went wrong")
            return
        }
        let result = await CinemaApi.register(formData)
        console.log(result)
        if (result.success && localStorage.length === 0) {
            console.log(`I am the register result ${result}`)
            setFormData(initialState)
            setToken(result.token)
        }
        else if (result.status === 401) console.log(result)
    }

    return (
        <div className="mb-3 p-5 text-center bg-light">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} />

                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" onChange={handleChange} />

                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" onChange={handleChange} />

                <label htmlFor="bio">User Bio</label>
                <input type="text" id="bio" name="bio" onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm