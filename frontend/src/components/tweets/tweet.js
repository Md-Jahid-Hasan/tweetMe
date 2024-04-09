import React from "react";
import {ActionBtn} from "./button";
import Avatar from "./avatar";
import {useGlobalContext} from "./tweetCreate";


export const Tweet = (props) => {
    const {item, style, retweet=false} = props

    return (
        <div className={style}>
            <div className={"card-header border-0"}>
                <Avatar user={item.user} timestamp={item.timestamp}/>
            </div>

            <div className="card-body">
                    <div>
                        <p>{item.content}</p>
                        <div className={"row g-3"}>
                            {item.tweet_media.slice(0, 2).map((media, key, arr) => (
                                <div key={key}
                                     className={`text-center col-${12 / arr.length} ${(item.tweet_media.length > 2 && key === 1) ? "position-relative bg-dark text-white p-0" : ""}`}>
                                    {(item.tweet_media.length > 2 && key === 1) &&
                                        <p className={"position-absolute top-50 start-50 translate-middle z-index-9 fs-6 fw-bold border border-3 border-light p-2"}>
                                            Click to see more...</p>}
                                    <a href={`/details/${item.id}`}>
                                        <img src={media.image} alt={key} style={{width:"30rem", height:"40rem"}}
                                             className={"img-fluid " + ((item.tweet_media.length > 2 && key === 1) && "opacity-50")}
                                        /></a>
                                </div>
                            ))}
                        </div>
                    </div>

                {item.is_retweet && <Retweet tweet={item.retweet}/>}

                {/*Action Button Section*/}
                {retweet ||
                    <div className="btn-toolbar py-3">
                        <ActionBtn tweet={item}
                                   action={item.isLike === false ? {type: "like", display: "Like"} :
                                       {type: "unlike", display: "Unlike"}}/>
                        <ActionBtn tweet={item} action={{type: "comment", display: `${item.total_comments} Comments`}}/>
                        {item.is_retweet ||
                            <ActionBtn tweet={item} action={{type: "retweet", display: "Retweet"}}
                                       style={"ms-sm-auto"}/>}
                    </div>}

                {/*Comment box*/}
                {retweet || <div className="d-flex mb-3">
                    <Avatar user={item.user}/>
                    <div className="input-group">
                        <textarea className="form-control me-2" placeholder="Leave a comment here"></textarea>
                        <button className="btn btn-primary btn-sm m-2"><i className="bi bi-send"></i></button>
                    </div>
                </div>}
            </div>
        </div>
    )
}


export const Retweet = (props) => {
    const {tweet} = props

    return (
        <div className="row">
            <div className="col-11 mx-auto p-2 border rounded mb-2">
                <p className="mb-0 text-muted small">Retweet by <a href={"#"}>{tweet.user.username}</a></p>
                <Tweet item={tweet} retweet={true}/>
            </div>
        </div>
    )
}