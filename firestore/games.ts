import {db} from './';

export const getGames = async () => {
    const snapshot = await db.collection('games').get();
    const games = [];
    snapshot.forEach((doc) => games.push({id: doc.id, ...doc.data()}));

    return games;
};

export const getGameById = async (id) => {
    const snapshot = await db.collection('games').doc(id).get();
    return {id, ...snapshot.data()};
};