import React, {useContext} from "react";
import {ActionBtn} from "./button";
import {Link, useHistory} from "react-router-dom";
import {useGlobalContext} from "./tweetCreate";


export const Tweet = (props) => {
    const {item, style} = props
    const history = useHistory()

    return (
        <div className={style}>
            <div className="mx-3">
                <p>{item.id} - <Link to={`/details/${item.id}`}>{item.content}</Link></p>
                <a href="/details">Click</a>
                {item.is_retweet && <Retweet tweet={item.retweet}/>}
            </div>
            <div className="btn btn-group">
                <ActionBtn tweet={item}
                           action={item.isLike === false ? {type: "like", display: "Like"} :
                               {type: "unlike", display: "Unlike"}}/>
                {item.is_retweet || <ActionBtn tweet={item} action={{type: "retweet", display: "Retweet"}}/>}
            </div>
        </div>
    )
}


export const Retweet = (props) => {
    const {tweet} = props

    return (
        <div className="row">
            <div className="col-11 mx-auto p-2 border rounded">
                <p className="mb-0 text-muted small">Retweet</p>
                <Tweet item={tweet}/>
            </div>
        </div>
    )
}