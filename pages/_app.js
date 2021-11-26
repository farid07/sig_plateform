import {ChakraProvider} from '@chakra-ui/react';
import Head from 'next/head';
import "@/styles/styles.css";

import {AuthProvider} from '@/lib/auth';
import customTheme from '@/styles/theme';

{/*import { DefaultSeo } from 'next-seo'; */
}

{/*import SEO from '../next-seo.config'; */
}

const App = ({Component, pageProps}) => {

    return (
        <ChakraProvider theme={customTheme}>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
            </Head>
            <AuthProvider>
                {/* <DefaultSeo {...SEO} /> */}
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;