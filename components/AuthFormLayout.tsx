import {Card} from 'antd';
import Head from 'next/head';
import s from './AuthFormLayout.module.css';

interface AuthFormLayoutProps {
    children: JSX.Element;
    title: string;
    width: number;
}

const AuthFormLayout = ({children, width, title}: AuthFormLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={s.authFormLayout}>
                <Card style={{width}} title={title}>
                    {children}
                </Card>
            </div>
        </>
    );
};

export {AuthFormLayout};
