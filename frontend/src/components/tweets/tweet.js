import React, {useContext} from "react";
import {ActionBtn} from "./button";
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
                    <div className="text-center me-2">
                        <img src={avatar} className="img-thumbnail rounded-circle"
                             style={{maxHeight: "3.7rem", maxWidth: "3.7rem"}} alt="..."/>
                    </div>
                    <div className="nav gap-3 align-items-center">
                        <h6 className="nav-item mb-0">{item.user.username}</h6>
                        <span className="nav-item">{moment(item.timestamp).fromNow()}</span>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {((item.retweet && item.content) || !item.retweet) && <div>
                    <p>{item.content}</p>
                    {item.image && <img className={"card-img"} src={item.image} alt={"no alter"}/>}
                </div>}
                {item.is_retweet && <Retweet tweet={item.retweet} user={item.user}/>}
                {((item.retweet && item.content) || !item.retweet) &&
                    <div className="btn-toolbar p-3">
                        <ActionBtn tweet={item}
                                   action={item.isLike === false ? {type: "like", display: "Like"} :
                                       {type: "unlike", display: "Unlike"}}/>
                        <ActionBtn tweet={item} action={{type: "comment", display: "Comment"}}/>
                        {item.is_retweet ||
                            <ActionBtn tweet={item} action={{type: "retweet", display: "Retweet"}}
                                       style={"ms-sm-auto"}/>}
                    </div>}
                <div className="d-flex mb-3">
                    <div className="text-center me-2">
                        <img src={avatar} className="img-thumbnail rounded-circle"
                             style={{maxHeight: "3.7rem", maxWidth: "3.7rem"}} alt="..."/>
                    </div>
                    <form className="row g-3 w-100">
                        <div className="form-floating col-11">
                        <textarea className="form-control" placeholder="Leave a comment here"
                                  id="floatingTextarea2"></textarea>
                            <label htmlFor="floatingTextarea2">Comments</label>
                        </div>
                        <div className="col-1">
                            <button className="float-end btn btn-primary mb-3 float-left"><i className="bi bi-send"></i>
                            </button>
                        </div>
                    </form>
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