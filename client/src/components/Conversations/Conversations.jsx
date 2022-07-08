import React, {useEffect, useState} from 'react'
import './conversations.css'
import {getUserById} from "../../services/UserService";

export default function Conversation({userId}){
    const [userInfo,setUserInfo] = useState({})
    useEffect(()=>{

        const initalizeUserInfo = async (userId) => {
            const res = await getUserById(userId)
            setUserInfo(res)
        }
        initalizeUserInfo(userId)
    },[])
    setTimeout(()=>console.log(userInfo), 3000)
    return(
        <>
            <div className="conversation">
                <img className="conversationImg"
                 src={userInfo.profilePicture ? userInfo.profilePicture : "assets/person/default.jpg"}
                 alt=""/>

                <span className="conversationName">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
            </div>
        </>
    )
}