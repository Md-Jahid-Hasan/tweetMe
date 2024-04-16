import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom'
import {tweet_details} from "../../action/tweets";
import Avatar from "./avatar";
import {ActionBtn} from "./button";


export const TweetDetails = () => {
    const {id} = useParams()
    const [item, setItem] = useState(null)
    const history = useHistory()

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
    console.log(item)
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
                        <Avatar user={item.user}/>
                        <div className="input-group">
                            <textarea className="form-control me-2" placeholder="Leave a comment here"></textarea>
                            <button className="btn btn-primary btn-sm m-2"><i className="bi bi-send"></i></button>
                        </div>
                    </div>

                    {/*Comment List*/}
                    <ul className={"list-group list-group-flush"}>
                        <li className={"list-group-item p-0"}>
                            <div className="d-flex mb-3">
                                <Avatar user={item.user}/>
                                <div className="container ps-0">
                                    <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                        <div className={"d-flex justify-content-between"}>
                                            <h6>Comment user 1</h6>
                                            <small className={"fw-lighter"}>5h4</small>
                                        </div>
                                        <p className={"fw-lighter"} style={{fontSize: "0.9em"}}>Removed demands expense
                                            account in outward tedious do. Particular way
                                            thoroughly unaffected projection.</p>
                                    </div>
                                </div>
                            </div>
                            {/*Nested comment*/}
                            <ul className={"ps-5 list-group list-group-flush"}>
                                <li className={"list-group-item p-0"}>
                                    <div className="d-flex mb-3">
                                        <Avatar user={item.user}/>
                                        <div className="container ps-0">
                                            <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                                <div className={"d-flex justify-content-between"}>
                                                    <h6>Comment user 1</h6>
                                                    <small className={"fw-lighter"}>5h4</small>
                                                </div>
                                                <p className={"fw-lighter"} style={{fontSize: "0.9em"}}>Removed demands
                                                    expense account in outward tedious do. Particular way
                                                    thoroughly unaffected projection.</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className={"ps-5 list-group list-group-flush"}>
                                <li className={"list-group-item p-0"}>
                                    <div className="d-flex mb-3">
                                        <Avatar user={item.user}/>
                                        <div className="container ps-0">
                                            <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                                <div className={"d-flex justify-content-between"}>
                                                    <h6>Comment user 1</h6>
                                                    <small className={"fw-lighter"}>5h4</small>
                                                </div>
                                                <p className={"fw-lighter"} style={{fontSize: "0.9em"}}>Removed demands
                                                    expense account in outward tedious do. Particular way
                                                    thoroughly unaffected projection.</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className={"list-group list-group-flush"}>
                        <li className={"list-group-item p-0"}>
                            <div className="d-flex mb-3">
                                <Avatar user={item.user}/>
                                <div className="container ps-0">
                                    <div className={"bg-secondary bg-opacity-25 px-3 py-1 rounded"}>
                                        <div className={"d-flex justify-content-between"}>
                                            <h6>Comment user 1</h6>
                                            <small className={"fw-lighter"}>5h4</small>
                                        </div>
                                        <p className={"fw-lighter"} style={{fontSize: "0.9em"}}>Removed demands expense
                                            account in outward tedious do. Particular way
                                            thoroughly unaffected projection.</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


            </div> :
            <h1>Loading</h1>}
    </div>)
}