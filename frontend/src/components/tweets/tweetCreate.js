import React, {createRef, useContext, useRef, useState} from "react";
import {createTweet} from "../../action/tweets";
import {TweetList} from "./tweetList";
import avatar from "./avatar.jpg"
import Avatar from "./avatar";


const Global = React.createContext()

export const CreateTweet = (props) => {
    const [newTweet, setNewTweet] = useState({})
    const [globalData, setGlobalData] = useState({})

    const newTweetCreate = (createdTweet) => {
        setNewTweet(createdTweet)
    }

    return (
        <Global.Provider value={[globalData, setGlobalData]}>
            <div className={"row"}>
                <div className={"col-md-8 col-lg-6 vstack gap-4"}>
                    <TweetCreateForm newTweetCreate={newTweetCreate} className='card card-body'/>
                    <TweetList tweet={newTweet}/>
                </div>
            </div>
        </Global.Provider>
    )
}

export function TweetCreateForm(props) {
    const textAreaRef = createRef()
    const [tweetContent, setTweetContent] = useState("")
    const [allFile, setAllFile] = useState([])
    const {newTweetCreate} = props

    const getNewTweetFromAction = (response) => {
        if (response.status === 201) {
            newTweetCreate(response.data)
        } else {
            console.log(response)
            alert("Failed to post.")
        }
    }

    const addNewFile = (event) => {
        event.preventDefault()
        let file = event.target[0].files[0]
        setAllFile(prevState => [...prevState, file])
        event.target[0].value = null
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let tweet = new FormData()
        tweet.append("content", tweetContent)
        for (const file of allFile){
            tweet.append("images", file)
        }
        
        createTweet(tweet, getNewTweetFromAction)
        setTweetContent("")
    }

    const handleTweetContent = (event) => (
        setTweetContent(event.target.value)
    )

    return (
        <div className={props.className}>
            <div className={"d-flex mb-3"}>
                <Avatar profile_url={avatar}/>
                <form onSubmit={handleSubmit} className="w-100 me-2">
                    <textarea required={true} className="form-control pe-4 border-1" value={tweetContent} name="tweet"
                              placeholder="Share your thoughts..." onChange={handleTweetContent}>
                    </textarea>
                    <button type="submit" className="btn btn-primary my-3">Tweet</button>
                </form>
            </div>
            <ul className="nav nav-pills small nav-stack">
                <li className="nav-item pe-2">
                    <a className="nav-link bg-light py-1 px-2 mb-0" href="#" data-bs-toggle="modal"
                       data-bs-target="#photoVideoModal">
                        <i className="bi bi-image-fill text-success pe-2">Photo</i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link bg-light py-1 px-2 mb-0" href="#" data-bs-toggle="modal"
                       data-bs-target="#photoVideoModal">
                        <i className="bi bi-camera-reels-fill text-info pe-2">Video</i>
                    </a>
                </li>
            </ul>
            <PhotoVideoModal handleSubmit={handleSubmit} tweetContent={tweetContent} allFile={allFile}
                             handleTweetContent={handleTweetContent} addNewFile={addNewFile}/>
        </div>
    )
}

export function PhotoVideoModal(props) {
    const {handleSubmit, tweetContent, handleTweetContent, allFile, addNewFile} = props

    return (
        <div className="modal fade" tabIndex="-1" id="photoVideoModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add post photo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={"d-flex mb-3"}>
                            <Avatar profile_url={avatar}/>
                            <form className="w-100">
                                <textarea value={tweetContent} required={true}
                                          className="form-control pe-4 border-1" name="tweet"
                                          onChange={handleTweetContent} placeholder="Share your thoughts...">
                                </textarea>
                            </form>
                        </div>

                        {allFile.map((file, key) => (
                            <div className={"d-flex flex-column col-md-3 align-items-center"} key={key}>
                                <i className="bi bi-file-image"></i>
                                <p>{file.name}</p>
                            </div>
                        ))}

                        <div>
                            <label className="form-label">Upload Attachment</label>
                            <form className="input-group mb-3" onSubmit={addNewFile}>
                                <input className="form-control form-control-sm" id="formFileSm" type="file"/>
                                <button type="submit" className="btn btn-success btn-sm">Add</button>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger me-2" data-bs-dismiss="modal">Close
                        </button>
                        <button type="button" onClick={handleSubmit} className="btn btn-outline-success">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const useGlobalContext = () => {
    return useContext(Global)
}