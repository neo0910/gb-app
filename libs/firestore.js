const admin = require('firebase-admin');
const atob = require('atob');

console.log('OOOOOOOOOOOOOOO');
console.log(process.env.FIRESTORE_SERVICE_KEY);

const serviceKey = JSON.parse(atob(process.env.FIRESTORE_SERVICE_KEY));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceKey),
        databaseURL: process.env.FB_DATABASE_URL,
    });
}

const db = admin.firestore();

export const getGames = async () => {
    const snapshot = await db.collection('games').get();
    const games = [];
    snapshot.forEach((doc) => games.push({id: doc.id, ...doc.data()}));

    return games;
};
