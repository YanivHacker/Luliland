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
import Online from "../Online/Online";

const SidebarData = [
    {
        title: "Feed",
        icon: <RssFeed />,
        link: "/"
    },
    {
        title: "Chat",
        icon: <Chat />,
        link: "/messenger"
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
                    <h4 className="sidebarTitle">Online Friends</h4>
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}