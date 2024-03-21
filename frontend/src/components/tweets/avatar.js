import React from "react";
import avatar from "./avatar.jpg";

const Avatar = (props) => {
    const {profile_url} = props

    return (
        <div className="text-center me-2">
            <img src={profile_url} className="img-thumbnail rounded-circle"
                 style={{maxHeight: "3.7rem", maxWidth: "3.7rem"}} alt="..."/>
        </div>
    )
}

export default Avatar