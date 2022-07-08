import React, {useEffect, useState} from 'react'
import './messenger.css'
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

import {Users} from "../../dummyData"
import {getAllUsers} from "../../services/UserService"

export default function Messenger() {
    const [userList,setUserList] = useState([])
    const [onlineUserList,setOnlineUserList] = useState([])
    useEffect(()=>{
        console.log('use effect call')
        //setUserList(Users)
        setOnlineUserList([Users[0],Users[1]])
        const initalizeFriendUserList = async () =>{
            try{
                const response = await getAllUsers()
                console.log(response.data)
                setUserList(response.data)
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
                        { userList.map(user=><Conversation key={user._id} user={user}/>) }
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