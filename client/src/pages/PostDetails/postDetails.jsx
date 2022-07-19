import { Image, List } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import PostDetails from "../../components/PostDetails/PostDetails"

const PostItem = () => {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <PostDetails />
                <Rightbar />
            </div>
        </>
    );


};
// todo add profile picture

export default PostItem;