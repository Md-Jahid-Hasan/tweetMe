import React, {createRef, useContext, useState} from "react";
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
    const {newTweetCreate} = props

    const getNewTweetFromAction = (response) => {

        if (response.status === 201) {
            newTweetCreate(response.data)
        } else {
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
            <div className={"d-flex mb-3"}>
                <Avatar profile_url={avatar}/>
                <form onSubmit={handleSubmit} className="w-100 me-2">
                    <textarea ref={textAreaRef} required={true} className="form-control pe-4 border-1" name="tweet"
                              placeholder="Share your thoughts...">
                    </textarea>
                </form>
                <button type="submit" className="btn btn-primary my-3">Tweet</button>
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
            <PhotoVideoModal handleSubmit={handleSubmit} textAreaRef={textAreaRef}/>
        </div>
    )
}

export function PhotoVideoModal(props) {
    const {handleSubmit, textAreaRef} = props
    const [allFile, setAllFile] = useState([])

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
                            <form onSubmit={handleSubmit} className="w-100">
                                <textarea ref={textAreaRef} required={true} className="form-control pe-4 border-1"
                                          name="tweet"
                                          placeholder="Share your thoughts...">
                                </textarea>
                            </form>
                        </div>

                        {allFile.map((file, key) => (
                            <div className={"d-flex flex-column col-md-3 align-items-center"} key={key}>
                                <i className="bi bi-file-image"></i>
                                <p>File name</p>
                            </div>
                        ))}

                        <div>
                            <label className="form-label">Upload Attachment</label>
                            <div className="input-group mb-3">
                                <input className="form-control form-control-sm" id="formFileSm" type="file"/>
                                <button type="button" className="btn btn-success btn-sm">Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-danger me-2" data-bs-dismiss="modal">Close
                        </button>
                        <button type="button" className="btn btn-outline-success">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const useGlobalContext = () => {
    return useContext(Global)
}