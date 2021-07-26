import React, {createRef, useContext, useState} from "react";
import {createTweet} from "../../action/tweets";
import {TweetList} from "./tweetList";


const Global = React.createContext()

export const CreateTweet = (props) => {
    const [newTweet, setNewTweet] = useState({})
    const [globalData, setGlobalData] = useState({})

    const newTweetCreate = (createdTweet) => {
        setNewTweet(createdTweet)
    }

    return (
        <Global.Provider value={[globalData, setGlobalData]}>
            <TweetCreateForm newTweetCreate={newTweetCreate} className='col-12 my-3'/>
            <TweetList tweet={newTweet}/>
        </Global.Provider>
    )
}

export function TweetCreateForm(props) {
    const textAreaRef = createRef()
    const {newTweetCreate} = props

    const getNewTweetFromAction = (response) => {

        if (response.status === 201){
            newTweetCreate(response.data)
        }else{
            console.log(response)
            alert("An error occurred")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const content = textAreaRef.current.value
        const tweet = {content}
        createTweet(tweet, getNewTweetFromAction)
    }
    return (
        <div className={props.className}>
            <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className="form-control" name="tweet">

                    </textarea>
                <button type="submit" className="btn btn-primary my-3">Tweet</button>
            </form>
        </div>
    )
}

export const useGlobalContext = () => {
    return useContext(Global)
}