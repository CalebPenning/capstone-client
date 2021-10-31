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

    const getPasswordComp = (stateInput, compInput) => {

    }

    const comparePasswords = async (p1, p2) => {
        if (p2 !== p1) {
            // do something (error handling, ???)
        }
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
            <h2 className="display-3 mb-3">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" id="password2" name="password2" />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input className="form-control" type="text" id="lastName" name="lastName" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input className="form-control" type="email" id="email" name="email" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="bio">User Bio</label>
                    <input className="form-control" type="text" id="bio" name="bio" onChange={handleChange} />
                </div>

                <button className="btn btn-sm btn-dark mt-3" type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm