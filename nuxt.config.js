module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'zh-CN',
      amp: true
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '明么(Mingme),一位来自90后的前端程序员;在一个偶然的机会下接触到前端这个职业,沉醉其中,喜欢安安静静的写代码,在代码的世界里奔跑.'
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Mingme,明么'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '明么的博客,明么,Mingme,Mingme的博客,mingme,mingme的博客,明么的博客首页,个人博客,前端文章,前端博客,前端技术'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1905390_swtc69c1vfs.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#19be6b',
    height: '2px'
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/index.less'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios.js', ssr: true },
    { src: '~/plugins/filters.js', ssr: true },
    { src: '~/plugins/api-repositories.js', ssr: true },
    { src: '~/plugins/storeCache', ssr: false },
    { src: '~/plugins/directive/focus/index.js', ssr: false },
    { src: '~/plugins/directive/loading/index.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: ['./assets/css/variables.less']
  },
  toast: {
    theme: 'bubble',
    position: 'top-center',
    duration: 3000,
    singleton: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    credentials: true
  },
  /*
   ** 配置代理
   */
  proxy: {
    '/api': {
      target: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://mingme.net/',
      changeOrigin: true
    },
    '/douban/': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/douban': ''
      }
    },
    '/yushu': {
      target: 'http://t.yushu.im/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/yushu': ''
      }
    },
    '/doubanOld/': {
      target: 'https://movie.douban.com',
      changeOrigin: true,
      pathRewrite: {
        '^/doubanOld/': ''
      }
    },
    '/ebookSearch/': {
      target: 'http://www.shuquge.com/search.php',
      changeOrigin: true,
      pathRewrite: {
        '^/ebookSearch/': ''
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0'
  }
}
