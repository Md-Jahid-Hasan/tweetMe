import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom'
import {Tweet} from './tweet'
import {tweet_details} from "../../action/tweets";


export const TweetDetails = () => {
    const {id} = useParams()
    const [item, setItem] = useState(null)
    const history = useHistory()



    useEffect(() => {
        tweet_details(id, getTweetDetails)
    }, [])

    const getTweetDetails = (response) => {
        setItem(response.data[0])
    }

    return (<div>
        {item !== null ? <Tweet item={item} style={'col-10 mx-auto col-md-6'}/> :
            <h1>Loading</h1>}
    </div>)
}