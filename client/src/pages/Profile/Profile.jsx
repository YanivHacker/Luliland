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
import {getCurrentUser} from "../../Utils/currentUser";


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    //const user = getCurrentUser();
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
                                    src="https://images.pexels.com/photos/1535907/pexels-photo-1535907.jpeg?cs=srgb&dl=pexels-karyme-fran%C3%A7a-1535907.jpg&fm=jpg"
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
                            <Rightbar profile = {user}/>
                        </div>
                    </div>
            </div>
        </>
    );
}