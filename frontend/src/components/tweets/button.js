import React, {useState} from "react";
import {tweet_action} from "../../action/tweets";
import {Route, Redirect} from 'react-router-dom'


export function ActionBtn(props) {
    const {tweet, action, style} = props
    const [likes, setLikes] = useState(tweet.total_likes)
    const [dis, setDisplay] = useState(action)
    const [auth, setAuth] = useState(false)

    if(auth) {
        return <Redirect to={"/login"}/>
    }

    const handleTweetActon = (response) => {
        const data = response.data
        const status = response.status
        console.log(status)
        if (status === 200) {
            setLikes(data.likes)
            if (dis.type === 'like')
                setDisplay({type: 'unlike', display: 'Unlike'})
            else if (dis.type === 'unlike')
                setDisplay({type: 'like', display: 'Like'})
        } else if (status === 201) {

        } else if (status === 403) {
            console.log(data)
            setAuth(true)
        }
    }

    const handleButton = (event) => {
        event.preventDefault()
        const data = {id: tweet.id, action: dis.type}
        tweet_action(data, handleTweetActon)
    }

    const display = dis.type === 'like' ? `${likes} ${dis.display}` : dis.display

    return (
        <button className={"btn btn-primary btn-sm m-2 " + style || ""} onClick={handleButton}>
            {display}</button>
    )
}