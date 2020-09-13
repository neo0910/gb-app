import {MainLayout} from '../components/MainLayout';
import Head from 'next/head';

const Index = () => {
    return (
        <MainLayout>
            <Head>
                <title>Application</title>
                <meta name="description" content="this is profile page" />
            </Head>
            <h1>Application</h1>
        </MainLayout>
    );
};

export default Index;
