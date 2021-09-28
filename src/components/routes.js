import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./home/Home"
const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
            </Switch> 
        </>
    )   
}

export default Routes