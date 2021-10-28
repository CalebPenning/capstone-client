import UserContext from "../UserContext"
import CinemaApi from "../../Api"
import { useState, useContext, useEffect } from "react"
import { Redirect } from "react-router-dom"

const LoginForm = () => {
    const {token, setToken} = useContext(UserContext)
    const initialState = {
        username: "",
        password: ""
    }

    const [formData, setFormData] = useState(initialState)
    const [errs, setErrs] = useState("")

    useEffect(() => {
        const errCleanUp = () => {
            setTimeout(() => setErrs(""), 3000)
        }
        if (errs.length) errCleanUp()
    }, [errs])

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
            setErrs(`You must fill out all fields`)
        }

        try {
            let result = await CinemaApi.login(formData)
            if (result.success) {
                setFormData(initialState)
                setToken(result.token)
            }
        }

        catch(err) {
            console.log(err)
            setErrs(err.response.data.error.message)
        }
    }

    if (token) return <Redirect to="/" />

    else return (
        <div className="mb-3 p-5 text-center bg-light">
            <h2 className="display-3 mb-3">Login</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-control" type="text" name="username" id="username" onChange={handleChange} />
                </div>
                <div className="mb-3 w-50 mx-auto">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={handleChange} />
                </div>
                <button className="btn btn-sm btn-dark mt-3" type="submit">Submit</button>
            </form>
            {errs.length ? <p className="alert alert-warning w-50 mx-auto">{errs}</p> : null}
        </div>
    )
}

export default LoginForm