import React, {useState, useEffect,useContext} from "react";
import {getTweets} from "../../action/tweets";
import {Tweet} from "./tweet";
import {useGlobalContext} from "./tweetCreate";


export const TweetList = (props) => {
    const [globalData, setGlobalData] = useGlobalContext()
    const {tweet} = props
    const [allTweets, setAllTweets] = useState([])

    useEffect( () => {
        getTweets(getTweetsFromAction)
        setGlobalData({name: "Jahid"})
    }, [])

    useEffect(() => {
        if (Object.keys(tweet).length !== 0) {
            setAllTweets([tweet, ...allTweets])
        }
    }, [tweet])

    const getTweetsFromAction = (response) => {
        setAllTweets(response.data)
    }

    if (allTweets.length === 0)
        return <h1>Loading</h1>

    return (<>
            {allTweets.map((item, number) => (
                  <Tweet item={item} style={"card"} key={number}/>
                )
            )}
        </>
    )
}






