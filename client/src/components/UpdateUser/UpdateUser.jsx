import React, {useRef, useState} from "react";
import {Button, Form, Input, PageHeader, notification, Avatar} from "antd";
import 'antd/dist/antd.css';
import {getCurrentUser} from "../../Utils/currentUser";
import {PermMedia} from "@material-ui/icons";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import axios from "axios";

const blobToBase64 = require('blob-to-base64')


function AntDesignOutlined() {
    return null;
}

const openNotification = (content) => {
    notification.open({
        message: content,
    });
};

export default function UpdateUser() {
    // const firstName = useRef();
    // const lastName = useRef();
    // const password = useRef();
    // const address = useRef();
    // const profilePicture = useRef();
    const [form] = Form.useForm();
    const firstName = Form.useWatch('firstName', form)
    const lastName = Form.useWatch('lastName', form)
    const address = Form.useWatch('address', form)
    const password = Form.useWatch('password', form)

    const user = getCurrentUser();
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

    const submitHandler = async (e) => {
        e.preventDefault();
        debugger
        let updatedUser = {firstName: firstName, lastName: lastName, password: password,
            address: address}
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            //newPost.img = fileName;
            blobToBase64.default(file, async function (error, base64) {
                if (!error) {
                    try {
                        debugger
                        console.log(updatedUser)
                        updatedUser.profilePicture = base64;
                        const response = await axios.patch(SERVER_URL + `/users/${user.email}`, updatedUser);
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
                    title="Title"
                    subTitle="This is a subtitle"
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
                            placeholder={user.firstName}
                            //ref={firstName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                    >
                        <Input
                            placeholder={user.lastName}
                            //ref={lastName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input
                            placeholder={user.address}
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
                            src={file && URL.createObjectURL(file)}
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