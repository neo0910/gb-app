import {getGameById, getGames} from '../../firestore/games';
import {Layout, Card, Rate} from 'antd';
import {MainLayout} from '../../components/MainLayout';
import Head from 'next/head';
import React from 'react';
import s from '../Index.module.css';
const {Meta} = Card;

const Index = ({game = null}) => {
    return (
        <MainLayout>
            <Head>
                <title>{game.name}</title>
                <meta name="description" content={game.name} />
            </Head>
            <Layout>
            {game
                ? <Card
                    key={game.id}
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
                : ''}
            </Layout>
        </MainLayout>
    );
};

export async function getStaticProps({params}) {
    const game = await getGameById(params.id);

    return {
        props: {
            game,
        },
    };
}

export async function getStaticPaths() {
    const games = await getGames();
    const paths = games.map(g => `/game/${g.id}`);
    return {paths, fallback: false};
}

export default Index;
