import envCustom from './env.custom'
// import sitemap from './config/sitemap'
const customEnv = envCustom[process.env.custom_mode || 'producelife']
export default {
  mode: 'universal', // 服务端渲染 静态
  target: 'server',
  head: {
    title: 'Starday - ネット通販公式サイト｜Starday市場',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Starday総合ネット通販サイト。自転車、インテリア、生活雑貨まで人気のアイテムが続々入荷中！激安な価格で登場！更に全品送料無料！ポイント還元・セールキャンペーン毎日実施中！' },
      { hid: 'keywords', name: 'keywords', content: 'starday,starday市場,starday mart,通販,インターネットショッピング,インターネット通販,オンラインショッピング' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
    // script: [
    //   {
    //     async: 'async',
    //     type: 'text/javascript',
    //     src: 'https://www.googletagmanager.com/gtag/js?id=UA-142624606-1'
    //   }, {
    //     async: 'async',
    //     type: 'text/javascript',
    //     src: 'https://s.yimg.jp/images/listing/tool/cv/ytag.js'
    //   }
    // ]
  },
  plugins: [
    '@/plugins/axios',
    '~/plugins/route',
    {
      src: '@/plugins/local.js',
      ssr: false
    }, {
      src: '@/plugins/session.js',
      ssr: false
    }, {
      src: '@/plugins/iview',
      ssr: true
    }, {
      src: '@/plugins/lazyload',
      ssr: false
    }, {
      src: '@/plugins/wxshare',
      ssr: false
    }
    // , {
    //   src: '@/plugins/statics/ga.js',
    //   ssr: false
    // }, {
    //   src: '@/plugins/statics/yahoo.js',
    //   ssr: false
    // }
  ],
  css: [
    {
      src: '@/assets/style/common.css'
    }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],
  sitemap: false,
  router: {
    mode: 'history',
    middleware: 'auth'
  },
  loading: {
    color: '#E76636',
    height: '2px'
  },
  axios: {
    proxy: true,
    prefix: '/api/',
    credentials: true,
    baseUrl: customEnv.proxyUrl
  },
  proxy: [
    [
      '/api',
      {
        target: customEnv.proxyUrl,
        pathRewrite: {
          '^/api': '/',
          changeOrigin: true
        }
      }
    ]
  ],
  build: {
    loaders: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
