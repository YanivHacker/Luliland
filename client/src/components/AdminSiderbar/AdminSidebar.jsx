import React from 'react'
import './adminSidebar.css'
//icons
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const data = [
    {
        title: "users",
        icon: <PeopleAltIcon />,
        url: "/"
    },
    {
        title: "users2",
        icon: <PeopleAltIcon />,
        url: "/"
    },
    {
        title: "user3",
        icon: <PeopleAltIcon />,
        url: "/"
    },
    {
        title: "user4",
        icon: <PeopleAltIcon />,
        url: "/"
    },
    {
        title: "users5",
        icon: <PeopleAltIcon />,
        url: "/"
    }
]//todo: delete this


export default function AdminSidebar(){
    return(
            <>
                <div className="adminSidebar">
                    <ul className="sidebarList">
                        {data.map((val,key) => {
                            return (
                                <li className="row" key={key}>
                                    <div id="icon">{val.icon}</div>
                                    <div id="title">{val.title}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
    )
}