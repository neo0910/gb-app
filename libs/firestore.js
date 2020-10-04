const admin = require('firebase-admin');

const serviceAccount =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_FIRESTORE_SERVICE_KEY
        : require('../keys/service-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://gameboy-app.firebaseio.com',
    });
}

const db = admin.firestore();

export const getGames = async () => {
    const snapshot = await db.collection('games').get();
    const games = [];
    snapshot.forEach((doc) => games.push({id: doc.id, ...doc.data()}));

    return games;
};
