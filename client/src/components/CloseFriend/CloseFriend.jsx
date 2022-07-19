import "./closeFriend.css";

export default function CloseFriend({user}) {
    console.log(user)
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
            <span className="sidebarFriendName">{user.firstName + " " + user.lastName}</span>
        </li>
    );
}