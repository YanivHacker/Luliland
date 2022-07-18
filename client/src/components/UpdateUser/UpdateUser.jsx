import React, {useRef, useState} from "react";
import {Button, Form, Input, PageHeader, notification, Avatar} from "antd";
import 'antd/dist/antd.css';
import {getCurrentUser} from "../../Utils/currentUser";
import {SERVER_URL} from "../../services/HttpServiceHelper";
import axios from "axios";

function AntDesignOutlined() {
    return null;
}

const openNotification = (content) => {
    notification.open({
        message: content,
    });
};

export default function UpdateUser() {
    const firstName = useRef();
    const lastName = useRef();
    const password = useRef();
    const address = useRef();
    const profilePicture = useRef();

    const user = getCurrentUser();
    const [file, setFile] = useState(null);
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
         <div style={{flex: 5.5}}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Edit your details"
                    subTitle={user.firstName + " " + user.lastName}
                />
                <Form
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
                            ref={firstName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                    >
                        <Input
                            placeholder={user.lastName}
                            ref={lastName}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input
                            placeholder={user.address}
                            ref={address}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password ref={password}/>
                    </Form.Item>

                    <Form.Item style={{paddingLeft: 400}}>
                        <Avatar
                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                            icon={<AntDesignOutlined />}
                            src={user.profilePicture}
                            ref={profilePicture}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        style={{paddingLeft: 230}}>
                        <Button type="primary" htmlType="submit" onClick={async () => {
                            let data = {firstName: firstName.current.value, lastName: lastName.current.value, password: password.current.value,
                                        address: address.current.value, profilePicture: profilePicture.current.value}
                            const response = await axios.patch(SERVER_URL + `/users/${user.email}`, data);
                            if(response.status === 200){
                                openNotification('User updated successfully!');
                            }
                            else openNotification('Error while updating your user');
                        }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}