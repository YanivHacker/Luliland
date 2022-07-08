import "./feed.css";
import Share from "../../components/Share/Share";
import Post from "../../components/Post/Post";
import {useEffect, useState} from "react";
import axios from "axios";

const {SERVER_URL} = require("../../services/HttpServiceHelper");
const POST_SERVICE = SERVER_URL + '/posts'

export default function Feed() {
    const {posts, setPosts} = useState([]);

    useEffect( () => {
        console.log("service call")
        const fetchPosts = async () => {
            const response = await axios.get(POST_SERVICE);
            console.log(response);
            setPosts(response.data);
        };
        fetchPosts();
        console.log(posts)
    }, []);
    
    return (
        <div className="feed">
            <div className="feedContainer">
                <Share />
                {/*{posts && posts.map((p) => (*/}
                {/*    <Post key={p.id} post={p} />*/}
                {/*))}*/}
            </div>
        </div>
    );
}