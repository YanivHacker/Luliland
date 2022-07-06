//this is an experiment for websocket
//TODO: delete this page when the real chat page is ready

import io from "socket.io-client";
import {SERVER_URL} from "../services/HttpServiceHelper";
import {useEffect, useState} from "react";

const socket = io.connect(SERVER_URL)

function Chat(){
    console.log(socket)
    return (
        <>
            <div>current socket is {socket.id}</div>
        </>
    )
}

export default Chat