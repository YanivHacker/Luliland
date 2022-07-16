import React from 'react'
import './admin.css'
import AdminSidebar from "../../components/AdminSiderbar/AdminSidebar";
import Topbar from "../../components/Topbar/Topbar";

export default function Admin(){

    return (
        <div className="admin">
            <Topbar />
            <div className="adminContainer">
                <div className="menu">
                    <AdminSidebar/>
                </div>
                <div className="content">
                    hi
                </div>
            </div>
        </div>
    )
}