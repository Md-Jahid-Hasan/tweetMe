import React, { Component } from 'react';
import ReactDOM from "react-dom";
import App from './components/App';
require("regenerator-runtime/runtime");


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("app")
)

// const e = React.createElement;
// const tweetElement = document.getElementById("app");
//
// if (tweetElement)
//     ReactDOM.render(
//         e(App, tweetElement.dataset), tweetElement
//     )


