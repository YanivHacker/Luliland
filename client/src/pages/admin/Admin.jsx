import React, {useState} from 'react'
import './admin.css'
import AdminSidebar from "../../components/AdminSiderbar/AdminSidebar";
import Topbar from "../../components/Topbar/Topbar";
import UserTable from "../../components/UserTable/UserTable";


//icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


export default function Admin(){
    const [selectedView, setSelectedView] = useState(<div/>)

    const menuOption = [
        {
            title: 'users',
            icon: <PeopleAltIcon />,
            action: e => setSelectedView(<UserTable/>)
        }
    ]

    return (
        <div className="admin">
            <Topbar />
            <div className="adminContainer">
                <div className="menu">
                    <AdminSidebar data={menuOption}/>
                </div>
                <div className="content">
                    {selectedView}
                </div>
            </div>
        </div>
    )
}