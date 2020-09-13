import {User} from 'firebase';
import {UserForCookies} from './mapUserData';
import cookies from 'js-cookie';

const getUserFromCookie = (): UserForCookies | null => {
    const cookie = cookies.get('auth');
    return cookie ? JSON.parse(cookie) : null;
};

const setUserCookie = (user: UserForCookies): void => cookies.set('auth', user, {expires: 1 / 24});

const removeUserCookie = (): void => cookies.remove('auth');

export {getUserFromCookie, setUserCookie, removeUserCookie};
