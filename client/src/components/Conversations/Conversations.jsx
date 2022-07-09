import React, {useEffect, useState} from 'react'
import './conversations.css'
import {getUserById} from "../../services/UserService";

export default function Conversation({user}){
    return(
        <>
            <div className="conversation">
                <img className="conversationImg"
                 src={user.profilePicture ? user.profilePicture : "assets/person/default.jpg"}
                 alt=""/>

                <span className="conversationName">{`${user.firstName} ${user.lastName}`}</span>
            </div>
        </>
    )
}