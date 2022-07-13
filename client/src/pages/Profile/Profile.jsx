import "./profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import { useParams } from "react-router";


export default function Profile() {
    const [user, setUser] = useState([]);
    const username = useParams().username;

    const fetchUser = async () => {
        const response = await axios.get(SERVER_URL + `/users?userEmail=${username}`);
        const { data } = response;
        setUser(data);
    };
    useEffect( () => {
        fetchUser();
    },[username]);
    //console.log(post.images)
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? user.profilePicture : "assets/person/7.jpg"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.userEmail}</h4>
                            <span className="profileInfoDesc">Hello my friends!</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userEmail={username}/>
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    );
}