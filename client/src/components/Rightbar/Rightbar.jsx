import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";
import CloseFriend from "../CloseFriend/CloseFriend";
import {getUserFriends} from "../../services/UserService";
import {useContext, useState, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";


export default function Rightbar({ profile }) {
    const { user: currentUser, dispatch } = useContext(AuthContext);

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
                <h4 className="rightbarTitle">Friends ({Users.length})</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
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
                const res = await getUserFriends()
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
                    {friendList.map((friend)=> (
                        <Link to={"/profile/" + friend.userEmail}
                        style={{textDecoration: "none"}}>
                            <div className="rightbarFollowing">
                                <img
                                    src={friend.profilePicture}
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.firstName + friend.lastName}</span>
                            </div>
                        </Link>
                    ))}
                    <div className="rightbarFollowing">
                        <img
                            src="assets/person/6.jpeg"
                            alt=""
                            className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">John Carter</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}