import { createNuxtPersistedState } from "pinia-plugin-persistedstate/nuxt";

const secondsPerDay = 86400;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(
    createNuxtPersistedState(useCookie, {
      cookieOptions: {
        maxAge: secondsPerDay * 30, // 30 days
        sameSite: "strict",
      },
    })
  );
});