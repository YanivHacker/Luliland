//this is an experiment for websocket
//TODO: delete this page when the real chat page is ready

import { io } from "socket.io-client";
import {SERVER_URL} from "../services/HttpServiceHelper";
import {useEffect, useState} from "react";


function Chat(){
    const [socket,setSocket] = useState({})
    useEffect(()=>{
        setSocket(new WebSocket(SERVER_URL.replace('http','ws')))
        console.log(socket)
    },[])
    return (
        <>
            <div>current socket is {socket.id}</div>
        </>
    )
}

export default Chat