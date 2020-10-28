import {db} from './';

export const getGames = async () => {
    const snapshot = await db.collection('games').get();
    const games = [];
    const platformPromises = [];

    snapshot.forEach((doc) => {
        platformPromises.push(db.collection('platform').doc(doc.data().platform).get());
        return games.push({id: doc.id, ...doc.data()});
    });

    const platforms = await Promise.all(platformPromises);

    games.forEach((g) => {
        const platformDoc = platforms.find((p) => p.id === g.platform);
        g.platform = {id: platformDoc.id, ...platformDoc.data()};
    });

    return games;
};

export const getGenres = async () => {
    const snapshot = await db.collection('genres').get();
    const genres = [];
    snapshot.forEach((doc) => genres.push({id: doc.id, ...doc.data()}));
    return genres;
};

export const getPlatforms = async () => {
    const snapshot = await db.collection('platform').get();
    const platforms = [];
    snapshot.forEach((doc) => platforms.push({id: doc.id, ...doc.data()}));
    return platforms.sort((a, b) => a.year - b.year);
};

export const getGameById = async (id) => {
    const snapshot = await db.collection('games').doc(id).get();
    return {id, ...snapshot.data()};
};
