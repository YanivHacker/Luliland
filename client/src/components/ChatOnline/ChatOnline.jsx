import React from 'react'
import './chatOnline.css'

export default function ChatOnline({user}) {
    return (
        <>
            <div className="chatOnline">
                <div className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={( user && user.profilePicture) || "assets/person/default.jpg"}
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{`${user.firstName} ${user.lastName}`}</span>
                </div>
            </div>
        </>
    )
}