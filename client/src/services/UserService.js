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

const deleteUserByEmail = async (email) => {
    const res = await axios.delete(`${USER_SERVICE}/${email}`)
    return res.status === 200
}

const login = async (credentials) => {
    console.log(credentials)
    await axios.post(USER_SERVICE + "/login",credentials)
        .then(response => console.log(response))
}

const getAllUsers = async () => { //may raise an exception
    const res = await axios.get(USER_SERVICE)
    return res.data
}

const getAllAddresses = async () => {
    const res = await axios.get(`${USER_SERVICE}/addresses`)
    return res.data
}

const getUserByEmail = async (email) => {
    const response = await axios.get(USER_SERVICE + `/${email}`)
    return response.data
}


const getUserFriends = async (userEmail) => {
    const response = await axios.get(USER_SERVICE + `/${userEmail}/friends`)
    return response.data
}

const getPopularFirstNames = async () => {
    const response = await axios.get(USER_SERVICE + '/popular/firstNames')
    return response.status === 200 ? response.data : null
}

const getPopularLastNames = async () => {
    const response = await axios.get(USER_SERVICE + '/popular/lastNames')
    return response.status === 200 ? response.data : null
}

const getMostActive = async () => {
    const response = await axios.get(USER_SERVICE + '/mostactive')
    return response.status === 200 ? response.data : null
}

module.exports = {signUp, login, getAllUsers, getUserByEmail, getUserFriends, getAllAddresses, deleteUserByEmail, getPopularFirstNames, getPopularLastNames, getMostActive}