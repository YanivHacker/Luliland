const axios = require("axios");
const {SERVER_URL} = require("./HttpServiceHelper");

const USER_SERVICE = SERVER_URL + '/users'

const signUp = (user) => {
    console.log("service call")
    console.log(user)
    axios.post(USER_SERVICE,user)
        .then(response => console.log(response))
        .catch(err=>console.log(err))
}

const login = async (credentials) => {
    console.log(credentials)
    await axios.post(USER_SERVICE + "/login",credentials)
        .then(response => console.log(response))
}

module.exports = {signUp, login}