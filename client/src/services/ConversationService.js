import {SERVER_URL} from "./HttpServiceHelper";
import axios from "axios";

const CONVERSATION_SERVICE = SERVER_URL + "/conversation"

export const getAllUserConversation = async (userId) => {
    const response = await axios.get(CONVERSATION_SERVICE + `/${userId}`,{})
    return response.data
}


export const createConversation = async (conversationInfo) => {
    await axios.post(CONVERSATION_SERVICE,conversationInfo)
    return conversationInfo
}

export const getSpecificConversation = async (userId1, userId2) => {
    let result = null
    await axios.get(CONVERSATION_SERVICE, {params: {userId1, userId2}}).then(response => result=response.data)
    console.log(result)
    return result;
}
