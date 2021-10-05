import './App.css'
import Routes from './components/routes'
import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SearchForm from './components/SearchForm/SearchForm'
import MediaList from './components/MediaList/MediaList'
import UserContext from './components/UserContext'

const App = () => {
  const [data, setData] = useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={ { data, setData } }>
          <NavBar />
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
