/*
const withMDX = require('@next/mdx')({
   extension: /\.mdx?$/
});
*/

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login/email',
        permanent: true,
      },
    ]
  },
  pageExtensions: ['js', 'jsx', 'mdx']
};
