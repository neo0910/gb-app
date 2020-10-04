import 'antd/dist/antd.css';
import {AuthProvider} from '../services/auth/auth';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css';

export default function MyApp({Component, pageProps}) {
    const {events} = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            console.log('App is changing to: ', url);
        };

        events.on('routeChangeStart', handleRouteChange);
        return () => events.off('routeChangeStart', handleRouteChange);
    }, []);

    return (
        <>
            <AuthProvider>
                <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height="3" />
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}
