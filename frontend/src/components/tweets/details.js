import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom'
import moment from "moment";

import {tweet_details} from "../../action/tweets";
import Avatar from "./avatar";
import {ActionBtn} from "./button";
import {commentCreate} from "../../action/tweets"


export const TweetDetails = () => {
    const {id} = useParams()
    const [item, setItem] = useState(null)
    const [commentType, setCommentType] = useState(null)

    useEffect(() => {
        tweet_details(id, getTweetDetails)
    }, [])

    const getTweetDetails = (response) => {
        setItem(response.data)
    }

    const tweetDetailsBody = (details) => (
        <>
            <p>{details.content}</p>
            <div className={"text-center"}>
                {details.tweet_media.map((media, key) => (
                    <div key={key}>
                        {media.media_type === "image" ?
                            <img src={media.image} alt={key} style={{width: "30rem", height: "40rem"}}
                                 className={"img-thumbnail mb-3"}/>
                            : <></>}
                    </div>
                ))}
            </div>
        </>
    )

    const appendComment = (response) => {
        // console.log(response)
        if (response.status === 201) {
            if (commentType === null) {
                setItem(prevState => ({
                    ...prevState, total_comments: prevState.total_comments + 1,
                    all_tweet_comments: [response.data, ...prevState.all_tweet_comments]
                }))
            }
        }
    }

    const postComment = (event) => {
        event.preventDefault()
        let comment = event.target[0].value
        if (comment.replaceAll(' ', '')) {
            let payload = {
                "content": comment
            }
            commentCreate(id, payload, appendComment)
            event.target[0].value = ""
        } else console.log("no no")
    }

    return (<div>
        {item !== null ?
            <div className="card col-lg-8 mx-auto col-md-6">
                <div className={"card-header border-0"}>
                    <Avatar user={item.user} timestamp={item.timestamp}/>
                </div>

                <div className="card-body">
                    {tweetDetailsBody(item)}

                    {/*Retweet Section*/}
                    {item.is_retweet && <div className="row">
                        <div className="col-11 mx-auto p-2 border rounded mb-2">
                            <p className="mb-0 text-muted small">Retweet by <a
                                href={"#"}>{item.retweet.user.username}</a></p>
                            <div className={"card-header border-0"}>
                                <Avatar user={item.user} timestamp={item.timestamp}/>
                            </div>
                            <div className={"card-body"}>
                                {tweetDetailsBody(item.retweet)}
                            </div>
                        </div>
                    </div>}

                    {/*Action button section*/}
                    <div className="btn-toolbar py-3">
                        <ActionBtn tweet={item} action={item.isLike === false ? {type: "like", display: "Like"} :
                            {type: "unlike", display: "Unlike"}}/>
                        <ActionBtn tweet={item} action={{type: "comment", display: `${item.total_comments} Comments`}}
                                   disabled={true}/>
                    </div>

                    {/*Comment Section*/}
                    {/*Comment Write*/}
                    <div className="d-flex mb-3">
                        <Avatar user={item.user} size={"small"}/>
                        <form className="input-group" onSubmit={postComment}>
                            <textarea className="form-control me-2" placeholder="Leave a comment here"></textarea>
                            <button type={"submit"} className="btn btn-primary btn-sm m-2"><i
                                className="bi bi-send"></i></button>
                        </form>
                    </div>

                    {/*Comment List*/}
                    {item.all_tweet_comments.map((comment, key) => (
                        <ul key={key} className={"list-group list-group-flush"}>
                            <li className={"list-group-item p-0"}>
                                <div className="d-flex mb-3">
                                    <div>
                                        <Avatar user={item.user} size={"small"}/>
                                    </div>
                                    <div className="container ps-0">
                                        <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                            <div className={"d-flex justify-content-between"}>
                                                <h6>{comment.user.username}</h6>
                                                <small
                                                    className={"fw-lighter"}>{moment(comment.timestamp).fromNow()}</small>
                                            </div>
                                            <p className={"fw-lighter m-0"}
                                               style={{fontSize: "0.9em"}}>{comment.content}</p>
                                        </div>
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><small>Like</small></li>
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <small>Reply</small></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                                {/*Nested comment*/}
                                {comment.replies.map((reply, r_key) => (
                                    <ul key={r_key} className={"ps-5 list-group list-group-flush"}>
                                        <li className={"list-group-item p-0"}>
                                            <div className="d-flex mb-3">
                                                <div>
                                                    <Avatar user={item.user} size={"small"}/>
                                                </div>
                                                <div className="container ps-0">
                                                    <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                                        <div className={"d-flex justify-content-between"}>
                                                            <h6>{reply.user.username}</h6>
                                                            <small
                                                                className={"fw-lighter"}>{moment(reply.timestamp).fromNow()}</small>
                                                        </div>
                                                        <p className={"fw-lighter m-0"}
                                                           style={{fontSize: "0.9em"}}>{reply.content}</p>
                                                    </div>
                                                    <nav aria-label="breadcrumb">
                                                        <ol className="breadcrumb">
                                                            <li className="breadcrumb-item"><small>Like</small></li>
                                                            <li className="breadcrumb-item active" aria-current="page">
                                                                <small>Reply</small></li>
                                                        </ol>
                                                    </nav>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        </ul>
                    ))}

                    <div className="spinner-grow spinner-grow-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                    <a className="ps-1">
                        Load more comments
                    </a>
                </div>


            </div> :
            <h1>Loading</h1>}
    </div>)
}