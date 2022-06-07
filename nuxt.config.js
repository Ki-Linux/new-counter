export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'プラマイカウンター',
    titleTemplate: '%s|プラマイカウンター',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary'},
      { hid: 'twitter:site', name: 'twitter:site', content: '@kihosei_6'},
      { hid: 'og:type', property: 'og:type', content: 'website'},
      { hid: 'og:title', property: 'og:title', content: 'プラマイカウンター'},
      { hid: 'og:description', property: 'og:description', content: 'プラマイカウンターはどんなときでもどんなものでも数える(カウント)したいときに楽しく使える魔法のようなカウンターなのだ。' },
      { hid: 'og:url', property: 'og:url', content: 'https://plusminuscounter.com'},
      { hid: 'og:image', property: 'og:image', content: '/opg_image.png'},
      { hid: 'og:site_name', name: 'og:site_name', content: 'プラマイカウンター'},
      { hid: 'description', name: 'description', content: 'プラマイカウンターはどんなときでもどんなものでも数える(カウント)したいときに楽しく使える魔法のようなカウンターなのだ。' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'apple-touch-icon', rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { hid: 'icon32', rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
      { hid: 'icon16', rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
      { hid: 'manifest', rel: 'manifest', href: '/site.webmanifest' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/reset.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedstate.js',
      mode: 'client'
    }
  ],

  ssr: true,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    //'@nuxt/types'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    prefix: '/api',
  },
  proxy: { '/api/':{ target: process.env.BASE_URL, pathRewrite: {'^/api/': '/'}} },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  target: 'server',
  generate: {
    fallback: true,
  }

}
