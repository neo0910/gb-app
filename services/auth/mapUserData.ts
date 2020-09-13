import {User} from 'firebase';

export type UserForCookies = {
    email: string;
    id: string;
    token: string;
};

export const mapUserData = async (user: User): Promise<UserForCookies> => {
    const token: string = await new Promise((res, rej) => {
        user.getIdToken().then((idToken) => res(idToken));
    });

    return {
        email: user.email,
        id: user.uid,
        token,
    };
};
