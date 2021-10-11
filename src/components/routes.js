import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./home/Home"
import MediaPage from "./MediaPage/MediaPage"
import SearchPage from "./SearchPage/SearchPage"
import UserCard from "./userCard/UserCard"
const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                {/* <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="/register">
                    <RegisterForm />
                </Route>
                <Route path="/users/:id" >
                    <UserProfile />
                </Route>
                <Route path="/users/:id/reviews" >
                    <ReviewList />
                </Route> */}
                <Route exact path="/media/search" >
                    <SearchPage />
                </Route>
                <Route path="/media/:imdbID">
                    <MediaPage />
                </Route>
                <Route path="/users/:id">
                    <UserCard />
                </Route>
            </Switch> 
        </>
    )   
}

export default Routes