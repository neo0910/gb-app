import {Layout, Menu, Row, message} from 'antd';
import {MainLayout} from '../../components/MainLayout';
import {useAuth} from '../../services/auth/auth';
import EmailForm from './components/EmailForm';
import PasswordForm from './components/PasswordForm';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';
import React, {useEffect, useState} from 'react';
import s from './Profile.module.css';
const {Content, Sider} = Layout;

const Profile = () => {
    // @ts-ignore
    const {user} = useAuth();
    const [profile, setProfile] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const menuClickHandler = ({keyPath}) => setSelectedKeys(keyPath);

    const onFinishProfileForm = async (values) =>
        user
            .updateProfile(values)
            .then(() =>
                setProfile({
                    ...profile,
                    displayName: values.displayName,
                    photoURL: values.photoURL,
                })
            )
            .then(() => message.success('Profile updated'))
            .catch(() => message.error('Profile update failed'));

    const onFinishEmailForm = ({email}) =>
        user
            .updateEmail(email)
            .then(() => setProfile({...profile, email}))
            .then(() => message.success('Email updated'))
            .catch(() => message.error('Email update failed'));

    const onFinishPasswordForm = ({confirm}) =>
        user
            .updatePassword(confirm)
            .then(() => message.success('Password updated'))
            .catch(() => message.error('Password update failed'));

    const selectedContent = () => {
        switch (selectedKeys[0]) {
            case '1':
                return (
                    <Row>
                        <ProfileCard {...profile} />
                        <ProfileForm profile={profile} onFinishProfileForm={onFinishProfileForm} />
                    </Row>
                );
            case '2':
                return <EmailForm profile={profile} onFinishEmailForm={onFinishEmailForm} />;
            case '3':
                return <PasswordForm onFinishPasswordForm={onFinishPasswordForm} />;
        }
    };

    useEffect(() => {
        if (!user) return;
        setProfile(user);
    }, [user]);

    return (
        <MainLayout>
            <Sider width={200}>
                <Menu
                    mode="inline"
                    style={{height: '100%', borderRight: 0}}
                    selectedKeys={selectedKeys}
                    onClick={menuClickHandler}
                >
                    <Menu.Item key="1">Profile</Menu.Item>
                    <Menu.Item key="2">Email</Menu.Item>
                    <Menu.Item key="3">Password</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content className={s.content}>{selectedContent()}</Content>
            </Layout>
        </MainLayout>
    );
};

export default Profile;
