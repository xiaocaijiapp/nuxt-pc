import sitemapjson from '../assets/json/sitemap'
const sitemap = {
  path: '/sitemap.xml',
  hostname: 'http://localhost:9000/',
  cacheTime: 1000 * 60 * 60 * 24,
  exclude: [
    '**'
  ],
  gzip: false,
  generate: false,
  routes: () => {
    return sitemapjson
  }
}
export default sitemap
