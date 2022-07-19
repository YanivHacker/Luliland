import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Form, Input, PageHeader, notification, Avatar} from "antd";
import 'antd/dist/antd.css';
import {getCurrentUser} from "../../Utils/currentUser";
import {PermMedia} from "@material-ui/icons";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import axios from "axios";
import {useParams} from "react-router";
import useMounted from "../../hooks/useMounted";

const USER_SERVICE = SERVER_URL + "/users"

const blobToBase64 = require('blob-to-base64')


function AntDesignOutlined() {
    return null;
}

const openNotification = (content) => {
    notification.open({
        message: content,
    });
};

const UpdateUser = (props) => {
    const isMounted  = useMounted();
    
    const [form] = Form.useForm();
    const user = props.profile;
    const firstName = Form.useWatch('firstName', form)
    const lastName = Form.useWatch('lastName', form)
    const address = Form.useWatch('address', form)
    const password = Form.useWatch('password', form)
    const userEmail = useParams().userEmail;

    //const user = getCurrentUser();
    const [file, setFile] = useState(user.profilePicture);
    const onFinish = (values) => {
        // let updatedUser = {firstName: values.firstName, lastName: values.lastName, password: values.password,
        //     address: values.address}
        // if (file) {
        //     const data = new FormData();
        //     const fileName = Date.now() + file.name;
        //     data.append("name", fileName);
        //     data.append("file", file);
        //     //newPost.img = fileName;
        //     blobToBase64.default(file, async function (error, base64) {
        //         if (!error) {
        //             try {
        //                 debugger
        //                 console.log(updatedUser)
        //                 updatedUser.profilePicture = base64;
        //                 const response = await axios.patch(SERVER_URL + `/users/${user.email}`, updatedUser);
        //                 if(response.status === 200){
        //                     openNotification('User updated successfully!');
        //                 }
        //                 else openNotification('Error while updating your user');
        //                 window.location.href("/");
        //             } catch (err) {}
        //         }
        //     })
        // }
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    const newUser = useMemo(() => user || {}, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        let updatedUser = {firstName: form.getFieldValue("firstname"), lastName: form.getFieldValue("lastname"), password: form.getFieldValue("password"),
            address: form.getFieldValue("address")}
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            //newPost.img = fileName;
            blobToBase64.default(file, async function (error, base64) {
                if (!error) {
                    try {
                        console.log(updatedUser)
                        updatedUser.profilePicture = base64;
                        const response = await axios.patch(SERVER_URL + `/users/${newUser.email}`, updatedUser);
                        if(response.status === 200){
                            openNotification('User updated successfully!');
                        }
                        else openNotification('Error while updating your user');
                        window.location.href("/");
                    } catch (err) {}
                }
            })
        }
    };


    return (
         <div style={{flex: 5.5}}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Edit your details"
                    subTitle={newUser.firstName + " " + newUser.lastName}
                />
                <Form form={form} onSubmitCapture={submitHandler}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                    >
                        <Input
                            placeholder={newUser.firstName}
                            //ref={firstName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                    >
                        <Input
                            placeholder={newUser.lastName}
                            //ref={lastName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input
                            placeholder={newUser.address}
                            //ref={address}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item style={{paddingLeft: 400}}>
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                            icon={<AntDesignOutlined />}
                            src={file && (file.type === Blob || file.type === File || file.type === MediaSource) && URL.createObjectURL(file)}
                            //ref={profilePicture}
                        />
                    </Form.Item>

                    <Form.Item style={{paddingLeft: 230}}>
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Upload avatar picture</span>
                            <input style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        style={{paddingLeft: 230}}>
                        <Button type="primary" htmlType="submit" onClick={submitHandler}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
         </div>
    )
}
export default React.memo(UpdateUser);

