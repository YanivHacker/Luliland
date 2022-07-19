import "./closeFriend.css";

export default function CloseFriend({user}) {
    console.log(user)
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : "assets/person/person-icon.png"} alt="" />
            <span className="sidebarFriendName">{user.firstName + " " + user.lastName}</span>
        </li>
    );
}