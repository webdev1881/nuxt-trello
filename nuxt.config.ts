// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
    "@nuxtjs/i18n",
  ],

  i18n: {
    locales: [
      { code: "uk", file: "uk.json", name: "Українська" },
      { code: "en", file: "en.json", name: "English" },
    ],
    defaultLocale: "uk",
    strategy: "no_prefix",
    lazy: true,
    bundle: {
      fullInstall: false,
    },
  },

  runtimeConfig: {
    auth: {
      origin: process.env.AUTH_ORIGIN,
      secret: process.env.AUTH_SECRET,
    },
    public: {
      pixabayApiKey: process.env.PIXABAY_API_KEY,
    },
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  colorMode: {
    preference: "light",
  },
  ui: {},
});
