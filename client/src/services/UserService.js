const axios = require("axios");
const {SERVER_URL} = require("./HttpServiceHelper");

const USER_SERVICE = SERVER_URL + '/users'

const signUp = (user) => {
    console.log("service call")
    console.log(user)
    axios.post(USER_SERVICE + '/',user)
        .then(response => console.log(response))
        .catch(err=>console.log(err))
}

const login = async (credentials) => {
    console.log(credentials)
    await axios.post(USER_SERVICE + "/login",credentials)
        .then(response => console.log(response))
}

const getAllUsers = async () => { //may raise an exception
    return await axios.get(USER_SERVICE)
}

 const getUserByEmail = async (email) => {
    const response = await axios.get(USER_SERVICE + `/${email}`)
    return response.data
}


const getUserFriends = async (userEmail) => {
    const response = await axios.get(USER_SERVICE + `/${userEmail}/friends`)
    return response.data
}

module.exports = {signUp, login, getAllUsers, getUserByEmail, getUserFriends}