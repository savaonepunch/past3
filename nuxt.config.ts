// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  imports: {
    dirs: ['stores'],
  },
  css: ["~/assets/main.scss", "~/assets/prisma-theme.css"],
  modules: [
    "nuxt-icon",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
  ],
});
