import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

const EditUser = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastname"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
// todo add profile picture

export default EditUser;