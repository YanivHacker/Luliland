import "./sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
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
            </div>
        </div>
    )
}