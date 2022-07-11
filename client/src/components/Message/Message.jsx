import React, {useEffect, useState} from 'react'
import "./message.css"
import {getUserById} from "../../services/UserService";

export default  function Message({own, userId, messageInfo}){
    const [userInfo,setUserInfo] = useState({})
    useEffect(()=>{
        console.log(own)
        const initializeUserInfo = async (userId) => {
            let result = {}
            try{
                result = await getUserById(userId)
            }catch(err){
                console.log(err)
            }
            finally {
                setUserInfo(result)
                console.log(userInfo)
            }
        }
        initializeUserInfo(userId)
    },[userId])
    console.log(own ? "message own" : "message")
    return (
        <>
            <div className={own ? "message own" : "message"}>
                <div className="messageTop">
                    <img
                        className="messageImg"
                        src={userInfo.profilePicture ? userInfo.profilePicture : "assets/person/default.jpg"}
                        alt=""
                    />
                    <p className="messageText">
                        {messageInfo.text}
                    </p>
                </div>
                <div className="messageBottom">1 hour ago</div>
            </div>
        </>
    )
}
