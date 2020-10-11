const admin = require('firebase-admin');
const atob = require('atob');

const serviceKey = JSON.parse(atob(process.env.FIRESTORE_SERVICE_KEY));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceKey),
        databaseURL: process.env.FB_DATABASE_URL,
    });
}

const db = admin.firestore();

export {db};
