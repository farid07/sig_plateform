import {ChakraProvider} from '@chakra-ui/react';
import Head from 'next/head';
import "@/styles/styles.css";
import "@/styles/popup.scss";


import React from 'react';


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
                <meta charSet="utf-8"/>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <AuthProvider>
                {/* <DefaultSeo {...SEO} /> */}
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;