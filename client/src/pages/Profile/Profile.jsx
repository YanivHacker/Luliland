import "./profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import { useParams } from "react-router";
import {getUserByEmail} from "../../services/UserService";


export default function Profile() {
    const [user, setUser] = useState({});
    const userEmail = useParams().userEmail;
    console.log(userEmail);

    const fetchUser = async () => {
        const response = await getUserByEmail(userEmail);
        setUser(response);
    };
    useEffect( () => {
        fetchUser();
    },[userEmail]);
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
                                    src={user.profilePicture ? user.profilePicture : "assets/person/default.jpg"}
                                    alt=""
                                />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.userEmail}</h4>
                                <span className="profileInfoDesc">Hello my friends!</span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed userEmail={userEmail}/>
                            <Rightbar />
                        </div>
                    </div>
            </div>
        </>
    );
}