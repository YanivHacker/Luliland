import { Button, Checkbox, Form, Input } from 'antd';
import React, {useMemo} from 'react';
import 'antd/dist/antd.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import UpdateUser from "../../components/UpdateUser/UpdateUser"
import {useParams} from "react-router";

const EditUser = () => {
    const userEmail = useParams().userEmail;
    const newUser = useMemo(() => user || {}, [user]);
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <UpdateUser />
                <Rightbar />
            </div>
        </>
    );


};
// todo add profile picture

export default EditUser;