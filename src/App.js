import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './components/routes'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import UserContext from './components/UserContext'
import jwt from "jsonwebtoken"
import CinemaApi from './Api'

/**
 *  TODO: 
 *  add liked reviews, following users, followed user to currentUser obj for quick access
 *  i.e. not using effect hooks to get collections all the time
 *  
 */

const App = () => {
  const [data, setData] = useState([])
  const [token, setToken] = useState(localStorage.getItem("userJWT") || null)
  const [currentUser, setCurrentUser] = useState()
  
  useEffect(() => {
    const getCurrUser = async () => {
      CinemaApi.token = token
      console.log(CinemaApi.token)
      console.log(jwt.decode(token))
      let res = await CinemaApi.getProfile(+jwt.decode(token).userID)
      console.log(`Get curr User res ${res}`)
      if (res.user) setCurrentUser(res.user)
    }
    if (token !== null) getCurrUser()
  }, [token])

  useEffect(() => {
    if (token) {
      localStorage.setItem("userJWT", token)
    } else {
      localStorage.clear()
      CinemaApi.token = null
    }
  }, [token])
  console.log(`I AM API TOKEN ${jwt.decode(CinemaApi.token) || "no token"}`)
  console.log(`I AM STATEFUL TOKEN ${jwt.decode(token) || "no token"}`)
  console.log(currentUser)

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={ { data, setData, token, setToken, currentUser, setCurrentUser } }>
          <NavBar />
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
