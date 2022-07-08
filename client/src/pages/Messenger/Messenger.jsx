import React, {useEffect, useState} from 'react'
import './messenger.css'
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

import {Users} from "../../dummyData"
import {getAllUserConversation} from "../../services/ConversationService";

// --------------------------------------------------
// TODO: read user id from local storage
// --------------------------------------------------

const currentUserId = "62bc6283a42e798700e2c099"

export default function Messenger() {
    const [userIdList,setUserIdList] = useState([])
    const [onlineUserList,setOnlineUserList] = useState([])
    useEffect(()=>{
        setOnlineUserList([Users[0],Users[1]])
        const initalizeFriendUserList = async () =>{
            try{
                let userList = []
                await getAllUserConversation(currentUserId).then(list=>{
                    userList = list.map(conversation => {
                        const members = conversation.members
                        return members.filter(id => id !== currentUserId)[0]
                    })
                    setUserIdList(userList)
                    console.log(userList)
                })
            }catch(err){
                console.log(err)
            }
        }
        initalizeFriendUserList()
    },[])
    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        { userIdList.map(userId=>{
                            return <Conversation key={userId} userId={userId}/>
                        }) }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="write something ..."></textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        { onlineUserList.map(user=><ChatOnline key={user.id.toString()} user={user}/>) }
                    </div>
                </div>
            </div>
        </>
    )
}