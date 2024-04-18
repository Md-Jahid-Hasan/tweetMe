import React, {useState, useEffect} from "react";
import avatar from "./avatar.jpg";
import moment from "moment";

const Avatar = (props) => {
    const {user, timestamp = false, size="regular"} = props
    const [pictureStyle, setPictureStyle] = useState({maxHeight: "3.7rem", maxWidth: "3.7rem"})

    useEffect(() => {
        if (size === 'small')
            setPictureStyle({maxHeight: "2.5rem", maxWidth: "2.5rem"})
    }, []);

    return (
        <div className="d-flex align-items-center">
            <div className="text-center me-2">
                <img src={avatar} className="img-thumbnail rounded-circle"
                     style={pictureStyle} alt="..."/>
            </div>
            {timestamp && <div className="nav gap-3 align-items-center">
                <h6 className="nav-item mb-0">{user.username}</h6>
                <span className="nav-item">{moment(timestamp).fromNow()}</span>
            </div>}
        </div>
    )
}

export default Avatar