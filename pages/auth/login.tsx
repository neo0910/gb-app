import {AuthFormLayout} from '../../components/AuthFormLayout';
import {Credentials} from '../../interfaces/credentials';
import {Form, Input, Button, Checkbox} from 'antd';
import {useAuth} from '../../services/auth/auth';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Link from 'next/link';
import s from './login.module.css';

const NormalLoginForm = () => {
    // @ts-ignore
    const {signIn} = useAuth();
    const onFinish = ({email, password}: Credentials) => signIn(email, password);

    return (
        <AuthFormLayout title="Log In" width={300}>
            <Form
                className="login-form"
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className={s.loginFormForgot} href="">
                        Forgot password
                    </a>
                </Form.Item> */}

                <Form.Item>
                    <Button block type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or{' '}
                    <Link href="./register">
                        <a>register now!</a>
                    </Link>
                </Form.Item>
            </Form>
        </AuthFormLayout>
    );
};

export default NormalLoginForm;
