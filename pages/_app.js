import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {ChakraProvider} from '@chakra-ui/react';
import Head from 'next/head';
import "@/styles/styles.css";
import "@/styles/popup.scss";
import React from 'react';


import {AuthProvider} from '@/lib/auth';
import customTheme from '@/styles/theme';
import {MapDataProvider} from "@/components/MapDataContext";


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
                <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css" rel="stylesheet"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <AuthProvider>
                <MapDataProvider>
                    {/* <DefaultSeo {...SEO} /> */}
                    <Component {...pageProps} />
                </MapDataProvider>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;