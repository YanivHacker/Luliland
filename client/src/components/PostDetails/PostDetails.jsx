import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Input, PageHeader, notification, Avatar, Image, List, Comment} from "antd";
import 'antd/dist/antd.css';
import {getCurrentUser} from "../../Utils/currentUser";
import {PermMedia} from "@material-ui/icons";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import TextArea from "antd/es/input/TextArea";

const blobToBase64 = require('blob-to-base64')

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const openNotification = (content) => {
    notification.open({
        message: content,
    });
};

export default function PostDetails({postID}) {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([])
    const [post, setPost] = useState([])
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');


    const handleSubmit = async () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    postID: post.id,
                    content: {value},
                },
            ]);
        }, 1000);
        const response = await axios.post(SERVER_URL + `/comments/`, {postID: post.id, content: {value}});
        if(response.status === 200) openNotification('Added comment successfully!');
        else openNotification('Failed adding comment to post');
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };


    const fetchComments = async () => {
        const response = async() => await axios.get(SERVER_URL + `/posts/${postID}/comments`);
        const { data } = response;
        setComments(data);
    };

    const fetchUsers = async () => {
        const response = await axios.get(SERVER_URL + `/users/`);
        const { data } = response;
        //console.log(data);
        setUsers(data);
    };

    const fetchPost = async () => {
        const response = async() => await axios.get(SERVER_URL + `/posts/${postID}`);
        const { data } = response;
        setPost(data);
    };
    useEffect( () => {
        fetchComments();
        fetchPost();
        fetchUsers();
    }, [postID]);
    console.log(comments)
    console.log(users)
    console.log(post)
    let user = users.find(u => u.email === post.userEmail);

    return (
         <div style={{flex: 5.5}}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Post details"
                />
                 <div className="postTopLeft">
                     <Link to={`/profile/${post.userEmail}`}>
                         <img
                             className="postProfileImg"
                             src={user.profilePicture ? user.profilePicture : "assets/person/person-icon.png"}
                            alt=""
                         />
                     </Link>
                     <span className="postUsername">
                                {user.firstName}
                            </span>
                     <span className="postDate">{format(post.creationDate)}</span>
                 </div>
                 <Image
                     width={200}
                     src={post && post.image}
                 />

                 <List
                     itemLayout="horizontal"
                     dataSource={comments}
                     renderItem={(item) => (
                         <List.Item>
                             <List.Item.Meta
                                 description={item.content}
                             />
                         </List.Item>
                     )}
                 />

             <Comment
                 avatar={<Avatar src={getCurrentUser().profilePicture}/>}
                 content={
                     <Editor
                         onChange={handleChange}
                         onSubmit={handleSubmit}
                         submitting={submitting}
                         value={value}
                     />
                 }
             />
         </div>
    )
}