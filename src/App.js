import './App.css'
import Routes from './components/routes'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SearchForm from './components/SearchForm/SearchForm'
import MediaList from './components/MediaList/MediaList'
import UserContext from './components/UserContext'
import jwt from "jsonwebtoken"
import CinemaApi from './Api'

const App = () => {
  const [data, setData] = useState([])
  const [token, setToken] = useState(localStorage.getItem("userJWT") || null)
  const [currentUser, setCurrentUser] = useState()
  // console.log(`I AM TOKEN ${jwt.decode(token).username}`)
  
  useEffect(() => {
    const getCurrUser = async () => {
      console.log(CinemaApi.token)
      CinemaApi.token = token
      let res = await CinemaApi.getByUsername(jwt.decode(token).username)
      if (res.user) setCurrentUser(res.user)
    }
    if (token !== null) getCurrUser()
  }, [token])

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={ { data, setData, token, setToken, currentUser } }>
          <NavBar />
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
