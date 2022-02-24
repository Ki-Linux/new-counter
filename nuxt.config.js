export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'new-counter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedstate.js',
      mode: 'client'
    }
  ],

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
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
    prefix: '/api',
  },
  proxy: { '/api/': { target: 'http://127.0.0.1:8000' } },


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  auth: {
    /*redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/about',
    },*/
    strategies: {
      local: {
        /*token: {
          property: "token",
          global: true,
        },
        user: {
          property: "user",
        },*/
        endpoints: {
          login: { url: "/api/login", method: "post", propertyName: 'token' },
          logout: { url: "/api/logout", method: "post" },
          user: { url: "/api/user", method: "get", propertyName: 'user' },
        },
      },
    },
  },
}
