import React, {useEffect, useRef, useState} from 'react'
import {io} from "socket.io-client"
import './messenger.css'
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversations";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

import {Users} from "../../dummyData"
import {getSpecificConversation} from "../../services/ConversationService";
import {getUserFriends} from "../../services/UserService";
import {fetchConversationMessages, sendMessage} from "../../services/MessageService";

// --------------------------------------------------
// TODO: read current user id from local storage
// --------------------------------------------------

const currentUserEmail = getCurrentUser().email;

export default function Messenger() {
    const [friendList, setFriendList] = useState([])
    const [currentConversationId, setCurrentConversationId] = useState(null)
    const [currentMessages, setCurrentMessages] = useState([])
    const [selectedFriendEmail,setSelectedFriendEmail] = useState(null)
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()
    const newMessageContent = useRef()

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
    },[currentUserEmail])

    //initialize socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.emit("addUser",currentUserEmail)
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderEmail,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && arrivalMessage?.senderEmail === selectedFriendEmail &&
            setCurrentMessages([...currentMessages, arrivalMessage])
    }, [arrivalMessage, currentConversationId])

    //fetch message list
    useEffect(()=>{
        const initalizeMessageList = async () => {
            const res = await fetchConversationMessages(currentConversationId)
            setCurrentMessages(res)
        }
        initalizeMessageList()
    },[currentConversationId])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[currentMessages])


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
                                        const conversation = await getSpecificConversation(currentUserEmail, user.email)
                                        setCurrentConversationId(conversation._id)
                                        setSelectedFriendEmail(user.email)
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
                                            return (
                                                <div key={message._id} ref={scrollRef}>
                                                    <Message own={message.sender===currentUserEmail} userEmail={message.sender===currentUserEmail ? currentUserEmail : selectedFriendEmail} messageInfo={message}/>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="chatBoxBottom">
                                        <textarea ref={newMessageContent} className="chatMessageInput" placeholder="write something ..."></textarea>
                                        {/*todo: check disable*/}
                                        <button
                                                className="chatSubmitButton"
                                                onClick={(e)=>{
                                                        const text = newMessageContent.current.value
                                                        if(text && text!== ""){
                                                            const sendAndGetNewMessage = async ()=>{
                                                                const savedMessage = await sendMessage(currentUserEmail,currentConversationId,text)
                                                                setCurrentMessages([...currentMessages,savedMessage])
                                                            }
                                                            sendAndGetNewMessage()
                                                            socket.current.emit("sendMessage",{
                                                                senderEmail: currentUserEmail,
                                                                receiverEmail: selectedFriendEmail,
                                                                text: newMessageContent
                                                            })
                                                        }else
                                                            console.log('message is empty')
                                                    }
                                                }
                                        >
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