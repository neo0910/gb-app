const {Header} = Layout;
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {useAuth} from '../services/auth/auth';
import {useRouter} from 'next/router';
import Link from 'next/link';
import React from 'react';
import s from './MainLayout.module.css';

const MainLayout = ({children}) => {
    // @ts-ignore
    const {signOut} = useAuth();
    const {pathname} = useRouter();

    const headerItems = [
        {
            handler: () => {},
            href: '/profile',
            key: '2',
            liStyle: {marginLeft: 'auto'},
            title: <UserOutlined style={{marginRight: 0}} />,
        },
        {
            handler: signOut,
            href: '/auth/login',
            key: '3',
            title: <LogoutOutlined style={{marginRight: 0}} />,
        },
    ];

    const selectedKeys = () =>
        headerItems.reduce((acc, cur) => {
            if (cur.href === pathname) {
                acc.push(cur.key);
            }

            return acc;
        }, []);

    return (
        <Layout className={s.layout}>
            <Header className={s.header}>
                <Link href="/">
                    <a className={s.logo}>gb-app</a>
                </Link>
                <Menu className={s.menu} theme="dark" mode="horizontal" defaultSelectedKeys={selectedKeys()}>
                    {headerItems.map((item) => (
                        <Menu.Item style={item.liStyle} key={item.key}>
                            <Link href={item.href}>
                                <a onClick={item.handler}>{item.title}</a>
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>
            <Layout>{children}</Layout>
        </Layout>
    );
};

export {MainLayout};
