import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";
import CloseFriend from "../CloseFriend/CloseFriend";
import {getUserFriends} from "../../services/UserService";
import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {getCurrentUser} from "../../Utils/currentUser"
import axios from "axios";
import {SERVER_URL} from "../../services/HttpServiceHelper";

const USER_SERVICE = SERVER_URL + "/users"


export default function Rightbar({ profile }) {
    //const user = getCurrentUser();
    const [friends, setFriends] = useState([]);
    const fetchFriends = async () => {
        const response = await axios.get(USER_SERVICE + `/${profile.email}/friends`)
        const { data } = response;
        console.log("friends" + data)
        setFriends(data);
    };
    useEffect( () => {
        fetchFriends();
    }, []);
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <hr className="rightbarHr" />
                <h4 className="rightbarTitle">Friends ({friends.length})</h4>
                <ul className="rightbarFriendList">
                    {friends.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        const [friendList, setFriendList] = useState([]);
        useEffect(() => {
            const initalizeFriendList = async () => {
                const res = await getUserFriends(profile.email)
                setFriendList(res)
            }
            initalizeFriendList()
        }, []);

        return (
            <>
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">New York</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Madrid</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friendList.map((friend)=> {
                        debugger
                        console.log(friend.email)
                        return (
                        <Link to={"/profile/" + friend.email}
                        style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                                <img
                                    src={friend.profilePicture ? friend.profilePicture : "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"}
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.firstName + " " + friend.lastName}</span>
                            </div>
                        </Link>
                    )})}
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
                {/*<HomeRightbar />*/}
            </div>
        </div>
    );
}