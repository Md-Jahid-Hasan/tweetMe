import React, {useContext} from "react";
import {ActionBtn} from "./button";
import Avatar from "./avatar";
import {Link, useHistory} from "react-router-dom";
import {useGlobalContext} from "./tweetCreate";
import moment from 'moment';
import avatar from "./avatar.jpg"


export const Tweet = (props) => {
    const {item, style} = props
    const history = useHistory()

    return (
        <div className={style}>
            <div className={"card-header border-0"}>
                <div className="d-flex align-items-center">
                    <Avatar profile_url={avatar}/>
                    <div className="nav gap-3 align-items-center">
                        <h6 className="nav-item mb-0">{item.user.username}</h6>
                        <span className="nav-item">{moment(item.timestamp).fromNow()}</span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {/*Post body*/}
                {((item.retweet && item.content) || !item.retweet) &&
                    <div>
                        <p>{item.content}</p>
                        <div className={"row g-3"}>
                            {item.tweet_media.slice(0, 2).map((media, key, arr) => (
                                <div key={key}
                                     className={`col-${12 / arr.length} ${(item.tweet_media.length > 2 && key === 1) ? "position-relative bg-dark text-white p-0" : ""}`}>
                                    {(item.tweet_media.length > 2 && key === 1) &&
                                        <p className={"position-absolute top-50 start-50 translate-middle z-index-9 fs-6 fw-bold border border-3 border-light p-2"}>
                                            Click to see more...</p>}
                                    <a href={`/details/${item.id}`}>
                                        <img src={media.image} alt={key}
                                             className={"img-fluid " + ((item.tweet_media.length > 2 && key === 1) && "opacity-50")}
                                        /></a>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {item.is_retweet && <Retweet tweet={item.retweet} user={item.user}/>}

                {/*Button Section*/}
                {((item.retweet && item.content) || !item.retweet) &&
                    <div className="btn-toolbar py-3">
                        <ActionBtn tweet={item}
                                   action={item.isLike === false ? {type: "like", display: "Like"} :
                                       {type: "unlike", display: "Unlike"}}/>
                        <ActionBtn tweet={item} action={{type: "comment", display: "Comment"}}/>
                        {item.is_retweet ||
                            <ActionBtn tweet={item} action={{type: "retweet", display: "Retweet"}}
                                       style={"ms-sm-auto"}/>}
                    </div>}
                <div className="d-flex mb-3">
                    <Avatar profile_url={avatar}/>
                        <div className="input-group">
                            <textarea className="form-control me-2" placeholder="Leave a comment here"></textarea>
                            <button className="btn btn-primary btn-sm m-2"><i className="bi bi-send"></i></button>
                        </div>
                </div>
            </div>
        </div>
    )
}


export const Retweet = (props) => {
    const {tweet, user} = props

    return (
        <div className="row">
            <div className="col-11 mx-auto p-2 border rounded">
                <p className="mb-0 text-muted small">Retweet by <a href={"#"}>{user.username}</a></p>
                <Tweet item={tweet}/>
            </div>
        </div>
    )
}