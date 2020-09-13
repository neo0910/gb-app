import {loadFirebase} from '../../libs/firebase';
import {mapUserData} from './mapUserData';
import {ProvideAuth} from '../../interfaces/auth';
import {removeUserCookie, setUserCookie} from './userCookies';
import {User} from 'firebase';
import {useRouter} from 'next/router';
import React, {useState, useEffect, useContext, createContext} from 'react';

const authContext = createContext({});

const AuthProvider = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => useContext(authContext);

function useProvideAuth(): ProvideAuth {
    const [user, setUser] = useState(null);
    const {push} = useRouter();

    const signIn = (email: string, password: string): Promise<void> =>
        loadFirebase()
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => push('/'))
            .then(console.log);

    const signUp = (email: string, password: string): Promise<boolean | void> =>
        loadFirebase()
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => push('/'))
            .catch(console.log);

    const signOut = async (): Promise<boolean | void> => loadFirebase().auth().signOut().catch(console.log);

    useEffect(() => {
        const unsubscribe = loadFirebase()
            .auth()
            .onAuthStateChanged(async (user: User) => {
                if (user) {
                    const userData = await mapUserData(user);
                    setUserCookie(userData);
                    setUser(user);
                } else {
                    removeUserCookie();
                    setUser(null);
                }
            });

        return () => unsubscribe();
    }, []);

    return {
        signIn,
        signOut,
        signUp,
        user,
    };
}

export {AuthProvider, useAuth};
