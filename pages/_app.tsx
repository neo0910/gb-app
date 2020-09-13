import 'antd/dist/antd.css';
import {AuthProvider} from '../services/auth/auth';
import NextNprogress from 'nextjs-progressbar';

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <AuthProvider>
                <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height="3" />
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}
