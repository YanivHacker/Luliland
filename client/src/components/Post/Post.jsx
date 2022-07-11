import "./post.css";
import { MoreVert } from "@material-ui/icons";
//import { Users } from "../../dummyData";
import {useEffect, useState} from "react";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';

const {SERVER_URL} = require("../../services/HttpServiceHelper");
//const USER_SERVICE = SERVER_URL + `/users/${post.userId}`;


export default function Post({ post }) {
    const [like,setLike] = useState(post.like)
    const [isLiked,setIsLiked] = useState(false)

    const [user, setUser] = useState([]);
    const fetchUser = async () => {
        const response = await axios.get(SERVER_URL + `/users/${post.userEmail}`);
        const { data } = response;
        console.log(data)
        setUser(data);
    };
    useEffect( () => {
        fetchUser();
    }, []);
    //console.log(user)
    //console.log(post.userEmail)


    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img
                            className="postProfileImg"
                            src={user.profilePicture ? user.profilePicture : <PersonIcon />}
                            alt=""
                        />
                        <span className="postUsername">
                            {user.firstName}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}