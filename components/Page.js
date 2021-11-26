import React from 'react';
import {NextSeo} from 'next-seo';

const Page = ({ name, path, children }) => {
  const title = `Sig Platform – ${name}`;
  const url = `https://fastfeedback.io${path}`;

  return (
   <>
    <NextSeo
      title={title}
      canonical={url}
      openGraph={{
        url,
        title
      }}
    />
    {children}
   </>
  );
};

export default Page;
