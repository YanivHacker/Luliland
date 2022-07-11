import React, {useEffect, useRef, useState} from 'react'
import './messenger.css'
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

import {Users} from "../../dummyData"
import {getAllUserConversation, getSpecificConversation} from "../../services/ConversationService";
import {getUserFriends} from "../../services/UserService";
import {fetchConversationMessages, sendMessage} from "../../services/MessageService";

// --------------------------------------------------
// TODO: read current user id from local storage
// --------------------------------------------------

const currentUserId = "62bc6283a42e798700e2c099"
const currentUserEmail = "Tiffany.Martinez@generated-email.com"

export default function Messenger() {
    const [friendList, setFriendList] = useState([])
    const [currentConversationId, setCurrentConversationId] = useState(null)
    const [currentMessages, setCurrentMessages] = useState([])
    const [messages,setMessages] = useState(([]))
    const [selectedFriendId,setSelectedFriendId] = useState(null)
    const messageContent = useRef()

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

    //fetch message list
    useEffect(()=>{
        const initalizeMessageList = async () => {
            const res = await fetchConversationMessages(currentConversationId)
            setCurrentMessages(res)
        }
        initalizeMessageList()
    },[currentConversationId])


    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        { friendList.map(user=>{
                            return (
                                <div key={user._id} onClick={()=> {
                                    const initializeConversation = async () => {
                                        const conversation = await getSpecificConversation(currentUserId, user._id)
                                        setCurrentConversationId(conversation._id)
                                        setSelectedFriendId(user._id)
                                    }
                                    initializeConversation()
                                }}>
                                    <Conversation user={user}/>
                                </div>
                            )
                        }) }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentConversationId!=null ?
                                <>
                                    <div className="chatBoxTop">
                                        {currentMessages.map(message => {
                                            console.log(message.sender)
                                            return <Message own={message.sender===currentUserId} userId={message.sender===currentUserId ? currentUserId : selectedFriendId} messageInfo={message} key={message._id}/>
                                        })}
                                    </div>

                                    <div className="chatBoxBottom">
                                        <textarea ref={messageContent} className="chatMessageInput" placeholder="write something ..."></textarea>
                                        {/*show new messages live*/}
                                        <button disabled={!messageContent.current.value || messageContent.current.value == "" || messageContent.current.value.length == 0}
                                                className="chatSubmitButton"
                                                onClick={()=>sendMessage(currentUserId,currentConversationId,messageContent.current.value)}>
                                            Send
                                        </button>
                                    </div>
                                </>
                                :
                                <span className="noConversationText">Open a conversation to start a chat.</span>
                        }
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