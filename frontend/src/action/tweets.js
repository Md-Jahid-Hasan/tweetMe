import axios from "axios"
import Cookies from 'js-cookie'

function header(){
    const csrftoken = Cookies.get('csrftoken')
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }
    return config
}

export async function getTweets(callback) {
     axios
        .get('api/tweets/', header())
        .then(response => callback(response))
        .catch(error => console.log(error))
}


export function createTweet(data, callback){
    let media_header = header()
    media_header.headers["Content-Type"] = "multipart/form-data"

    axios
        .post('api/tweets/create/', data, media_header)
        .then(response => callback(response))
        .catch(error => console.log(error))
}

export function tweet_action(data, callback){
    axios
        .post('http://127.0.0.1:8000/api/tweets/action/', data, header())
        .then(response => callback(response))
        .catch(error => callback(error.response))
}

export function tweet_details(tweet_id, callback){
    axios
        .get(`/api/tweet/details/${tweet_id}`, header())
        .then(response => callback(response))
        .catch(error => console.log(error))
}

export function commentCreate(tweet_id, payload, callback){
    axios
        .post(`http://127.0.0.1:8000/api/tweet/comments/${tweet_id}/`, payload, header())
        .then(response => callback(response))
        .catch(error => callback(error.response))
}

// if use Browser router we can use this route.
// const host = window.location.protocol + "//" + window.location.host
// `${host}/api/tweet/details/