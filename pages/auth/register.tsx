import {AuthFormLayout} from '../../components/AuthFormLayout';
import {Credentials} from '../../interfaces/credentials';
import {Form, Input, Button} from 'antd';
import {useAuth} from '../../services/auth/auth';
import Link from 'next/link';
import React from 'react';

const RegistrationForm = () => {
    // @ts-ignore
    const {signUp} = useAuth();
    const [form] = Form.useForm();
    const onFinish = (values: Credentials) => signUp(values.email, values.password);

    return (
        <AuthFormLayout title="Register" width={300}>
            <Form form={form} onFinish={onFinish} scrollToFirstError>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Register
                    </Button>
                    Or{' '}
                    <Link href="./login">
                        <a>Log In</a>
                    </Link>
                </Form.Item>
            </Form>
        </AuthFormLayout>
    );
};

export default RegistrationForm;
