const axios = require("axios");
const {SERVER_URL} = require("./HttpServiceHelper");

const POST_SERVICE = SERVER_URL + '/posts'

const getAllPosts = async () =>{
    const res = await axios.get(POST_SERVICE)
    return res.data
}

module.exports = {getAllPosts}