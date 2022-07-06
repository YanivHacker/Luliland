//this is an experiment for websocket
//TODO: delete this page when the real chat page is ready

import socketio from "socket.io-client";
import {SERVER_URL} from "../services/HttpServiceHelper";
import {useEffect, useState} from "react";


/*
* import socketio from "socket.io-client";

* */

function Chat(){
    const [socket,setSocket] = useState({})
    useEffect(()=>{
        const newSocket = socketio.connect(SERVER_URL)
        setSocket(newSocket)
        console.log(newSocket)
        console.log(socket)
    },[])
    return (
        <>
            <div>current socket is {socket.id}</div>
        </>
    )
}

export default Chat