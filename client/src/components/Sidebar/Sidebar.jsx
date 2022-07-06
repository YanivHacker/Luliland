import "./sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import {Users} from "../../dummyData"
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event
} from "@material-ui/icons";
import CloseFriend from "../CloseFriend/CloseFriend";

const SidebarData = [
    {
        title: "Feed",
        icon: <RssFeed />,
        link: "/home"
    },
    {
        title: "Chat",
        icon: <Chat />,
        link: "/home"
    }
]



export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    {SidebarData.map((val,key)=>{
                        return (
                            <li className="sidebarListItem"
                                key={key}
                                onClick={() => {window.location.pathname = val.link}}>
                                <div className="sidebarIcon">{val.icon}</div>
                                <div className="sidebarListItemTitle">{val.title}</div>
                            </li>
                        )
                    })}
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}