import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./home/Home"
import MediaPage from "./MediaPage/MediaPage"
import SearchPage from "./SearchPage/SearchPage"
import UserCard from "./userCard/UserCard"
import FollowingList from "./FollowingList/FollowingList"
import FollowersList from "./FollowersList/FollowersList"
import LikedList from "./LikedList/LikedList"
import RegisterForm from "./RegisterForm/RegisterForm"
import LoginForm from "./LoginForm/LoginForm"

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route exact path="/register">
                    <RegisterForm />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>
                <Route exact path="logout">
                    <Redirect to="/" />
                </Route>
                {/* <Route path="/users/:id/reviews" >
                    <ReviewList />
                </Route>  */}
                <Route exact path="/media/search" >
                    <SearchPage />
                </Route>
                <Route path="/media/:imdbID">
                    <MediaPage />
                </Route>
                <Route path="/users/:id/following">
                    <FollowingList />
                </Route>
                <Route path="/users/:id/followers">
                    <FollowersList />
                </Route>
                <Route path="/users/:id/likes">
                    <LikedList />
                </Route>
                <Route path="/users/:id">
                    <UserCard />
                </Route>
            </Switch> 
        </>
    )   
}

export default Routes