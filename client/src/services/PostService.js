const axios = require("axios");
const {SERVER_URL} = require("./HttpServiceHelper");

const POST_SERVICE = SERVER_URL + '/posts'

const getAllPosts = async () =>{
    const res = await axios.get(POST_SERVICE)
    return res.data
}

const getDistributionTag = async (tag1,tag2,tag3) => {
    const res = await axios.post(`${POST_SERVICE}/utils/tags`, {tag1, tag2, tag3})
    if(res.status!==200)
        return null
    return res.data
}

const getPostAveragePerUser = async () => {
    const res = await axios.get(`${POST_SERVICE}/utils/average`)
    if(res.status!==200)
        return null
    return res.data
}

const deletePostById = async (postId) => {
    const res = await axios.delete(`${POST_SERVICE}/${postId}`)
    return res.status===200
}

module.exports = {getAllPosts, getDistributionTag, getPostAveragePerUser, deletePostById}