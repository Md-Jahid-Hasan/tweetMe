import React, {useContext} from "react";
import {ActionBtn} from "./button";
import {Link, useHistory} from "react-router-dom";
import {useGlobalContext} from "./tweetCreate";


export const Tweet = (props) => {
    const {item, style} = props
    const history = useHistory()

    return (
        <div className={style}>
            {((item.retweet && item.content) || !item.retweet) && <div className="card-body">
                {/*<p>{item.id} - <Link to={`/details/${item.id}`}>{item.content}</Link></p>*/}
                <p>{item.content}</p>

                {item.image && <img className={"card-img"} src={item.image} alt={"no alter"}/>}
            </div>}
            {item.is_retweet && <Retweet tweet={item.retweet} user={item.user}/>}
            {((item.retweet && item.content) || !item.retweet) && <div className="btn-toolbar p-3">
                <ActionBtn tweet={item}
                           action={item.isLike === false ? {type: "like", display: "Like"} :
                               {type: "unlike", display: "Unlike"}}/>
                <ActionBtn tweet={item} action={{type: "comment", display: "Comment"}}/>
                {item.is_retweet || <ActionBtn tweet={item} action={{type: "retweet", display: "Retweet"}}  style={"ms-sm-auto"}/>}
            </div>}
        </div>
    )
}


export const Retweet = (props) => {
    const {tweet, user} = props

    return (
        <div className="row">
            <div className="col-11 mx-auto p-2 border rounded">
                <p className="mb-0 text-muted small">Retweet by {user.username}</p>
                <Tweet item={tweet}/>
            </div>
        </div>
    )
}