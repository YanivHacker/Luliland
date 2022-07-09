import React, {useEffect, useState} from 'react'
import './messenger.css'
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

import {Users} from "../../dummyData"
import {getAllUserConversation} from "../../services/ConversationService";
import {getUserFriends} from "../../services/UserService";

// --------------------------------------------------
// TODO: read current user id from local storage
// --------------------------------------------------

const currentUserId = "62bc6283a42e798700e2c099"
const currentUserEmail = "Tiffany.Martinez@generated-email.com"

export default function Messenger() {
    const [friendList, setFriendList] = useState([])
    const [onlineUserList,setOnlineUserList] = useState([])
    useEffect(()=>{
        setOnlineUserList([Users[0],Users[1]])// TODO: get online users from server
        const initializeFriendUserList = async () =>{
            let friendList = []
            try{
                friendList = await getUserFriends(currentUserEmail)
            }catch(err){
                console.log(err)
            }finally {
                setFriendList(friendList)
            }
        }
        initializeFriendUserList()

    },[currentUserId])
    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        { friendList.map(user=>{
                            return <Conversation key={user._id} user={user}/>
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