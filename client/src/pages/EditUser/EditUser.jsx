import { Button, Checkbox, Form, Input } from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import 'antd/dist/antd.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import UpdateUser from "../../components/UpdateUser/UpdateUser"
import {useParams} from "react-router";
import axios from "axios";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import useMounted from "../../hooks/useMounted";

const EditUser = () => {
    const userEmail = useParams().userEmail;
    const newUser = useMemo(() => userEmail || "", [userEmail]);
    const isMounted = useMounted();
    const [user, setUser] = useState({});

    useEffect( () => {
        const fetchUser = async () => {
            const response = await axios.get( SERVER_URL + `/users/${userEmail}`)
            const { data } = response;
            console.log(data)
            if (isMounted)
                setUser(data);
        };
        userEmail && isMounted && fetchUser()
    },[userEmail, isMounted]);

    const updatedUser = useMemo(() => user || {}, [user]);
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                {updatedUser && <UpdateUser profile={updatedUser}/>}
                {updatedUser && <Rightbar profile={updatedUser}/>}
            </div>
        </>
    );


};
// todo add profile picture

export default EditUser;