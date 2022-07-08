import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@material-ui/icons"
import { Link } from 'react-router-dom';

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarleft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Luliland</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search />
                    <input placeholder="Search for friends posts and more!" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <div className="topbarImage">
                    <Person />
                </div>
            </div>
        </div>
    )
}