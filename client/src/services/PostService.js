const axios = require("axios");
const {SERVER_URL} = require("./HttpServiceHelper");

const POST_SERVICE = SERVER_URL + '/posts'

const getAllPosts = async () =>{
    console.log("service call")
    let data = []
    // await axios.get(POST_SERVICE,{}).then(response => data=response.data).catch(err=> {
    //     console.log('error')
    //     data = []
    // })
    axios({
        method: "get",
        url: POST_SERVICE
    }).then(response => data = response.data)
    console.log(data)
    return data
}

module.exports = {getAllPosts}