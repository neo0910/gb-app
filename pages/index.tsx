import {getGames} from '../firestore/games';
import {Layout, Menu, Card, Rate} from 'antd';
import {MainLayout} from '../components/MainLayout';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import s from './Index.module.css';
const {Content, Sider} = Layout;
const {Meta} = Card;

const Index = ({games}) => {
    return (
        <MainLayout>
            <Head>
                <title>Games</title>
                <meta name="description" content="all games page" />
            </Head>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="1">Games</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '16px 24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div className={s.gamesList}>
                            {games.map((game) => (
                                <Link key={game.id} href='/game/[id]' as={`/game/${game.id}`}>
                                    <a>
                                        <Card
                                            hoverable
                                            style={{width: 250, margin: 12}}
                                            cover={
                                                <div
                                                    className={s.gamePoster}
                                                    style={{backgroundImage: `url(${game.poster})`}}
                                                />
                                            }
                                        >
                                            <Meta title={game.name} description={game.platform} />
                                            <Rate disabled defaultValue={game.ranking} />
                                        </Card>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </MainLayout>
    );
};

export async function getStaticProps() {
    const games = await getGames();

    return {
        props: {
            games,
        },
    };
}

export default Index;
