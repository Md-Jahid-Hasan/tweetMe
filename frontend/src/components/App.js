import React, {Fragment, useContext} from "react";
import {CreateTweet} from "./tweets/tweetCreate";
import {TweetDetails} from "./tweets/details";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const App = () => {
    return (
        <div className="container">
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path='/' component={CreateTweet}/>
                        <Route exact path='/details/:id' component={TweetDetails}/>
                    </Switch>
                </Fragment>
            </Router>
        </div>
    )
}

export default App
